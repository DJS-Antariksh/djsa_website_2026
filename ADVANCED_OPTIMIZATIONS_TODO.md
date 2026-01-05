# Advanced Performance Optimization Plan - TODO

## 🎯 Overview
This document outlines advanced optimization strategies that have **NOT** been implemented yet. These are asset-level and scheduling optimizations that can achieve 2-3 second time-to-interactive.

**Status**: Implementation Pending  
**Priority**: High  
**Expected Impact**: 60-70% improvement in load time and scroll performance

---

## 🔴 CRITICAL - Asset Re-Authoring (Highest Priority)

### 1. Split Hero Model into Two Assets

**Current State**: Single `avyaan_coloured.glb` with assembly animation

**Required Change**: Create two separate assets

#### Step-by-Step Blender Workflow:

1. **Open** `avyaan_coloured.glb` in Blender
2. **Save As** → `hero_static.blend`
3. **Apply All Modifiers**:
   - Select all objects → Object → Apply → All Modifiers
4. **Join Meshes**:
   - Select similar objects → Ctrl+J (Join)
   - Goal: Reduce to 1-3 mesh objects
5. **Remove Armatures/Rigs**:
   - Delete any skeleton/bone structures
6. **Delete Animation Tracks**:
   - Go to Dope Sheet → Delete all keyframes
   - Go to NLA Editor → Delete all strips
7. **Export** → GLTF 2.0
   - Filename: `hero_static.glb`
   - ✅ Include: Meshes, Materials
   - ❌ Exclude: Animations, Armatures, Cameras, Lights

#### Target Specs:
- **File size**: < 500KB (vs current ~2-3MB)
- **Draw calls**: 1-2 (vs current 15-20)
- **Load time**: < 300ms

#### Keep Original As:
- `hero_assembly.glb` (current file, renamed)
- Will be lazy-loaded after interactivity

---

### 2. Draco Compression for All Models

**Tool Required**: Install globally
```bash
npm install -g @gltf-transform/cli
```

#### Commands to Run:

```bash
# Hero model
gltf-transform draco public/models/avyaan_coloured.glb public/models/avyaan_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12

# Rover models
gltf-transform draco public/models/prayan.glb public/models/prayan_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12

gltf-transform draco public/models/abhyan.glb public/models/abhyan_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12

gltf-transform draco public/models/vidyaanAR-v3.glb public/models/vidyaanAR-v3_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12

# Drone models
gltf-transform draco public/models/akshayaan_compressed.glb public/models/akshayaan_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12

gltf-transform draco public/models/nabhyaan.glb public/models/nabhyaan_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12

gltf-transform draco public/models/jatayu_compressed.glb public/models/jatayu_draco.glb \
  --quantize-position 14 \
  --quantize-normal 10 \
  --quantize-texcoord 12
```

#### Expected Results:
- **60-80% size reduction**
- Faster GPU parsing
- Lower memory consumption

#### After Compression:
Update file paths in code to use `_draco.glb` versions

---

### 3. Texture Optimization (KTX2/BasisU)

**Why**: GPU-native format, eliminates transcoding stutter

#### Commands:
```bash
# Convert to KTX2 with ETC1S compression (smaller, good for web)
gltf-transform etc1s public/models/avyaan_draco.glb public/models/avyaan_final.glb

# Repeat for all other models
gltf-transform etc1s public/models/prayan_draco.glb public/models/prayan_final.glb
# ... and so on
```

#### Additional Texture Rules:
- **Never exceed 2K textures** (2048x2048)
- **Prefer 1K** (1024x1024) for non-hero models
- Reduce texture resolution in Blender if needed

#### Benefits:
- Massive VRAM reduction
- Eliminates scroll spikes caused by texture uploads
- Faster GPU processing

---

### 4. Mesh Simplification

**Why**: CAD-level geometry is overkill for web

#### Commands:
```bash
# Reduce geometry by 50% (visually identical in motion)
gltf-transform simplify public/models/prayan_draco.glb public/models/prayan_simplified.glb \
  --ratio 0.5

# Apply to all secondary models (NOT hero initially)
```

#### Manual Blender Approach:
1. Open model in Blender
2. Select mesh → Modifiers → Add Decimate
3. Set Ratio to 0.5 (50% reduction)
4. Apply modifier
5. Re-export

#### Note:
- Start with 50% reduction
- Test visually
- Can go up to 70% for distant/small models

---

### 5. Material Optimization in Blender

#### Goals:
- **≤ 4 materials per model**
- Merge materials with same colors
- Bake textures if needed

#### Process:
1. Open model in Blender
2. **Material View** → Check material count
3. **Identify duplicates** (same color/properties)
4. **Select objects** with duplicate materials
5. **Assign single material** to all
6. **Delete unused materials** from slots
7. Re-export

#### Benefits:
- Fewer draw calls
- Lower GPU state changes
- Faster rendering

---

## 🟡 IMPORTANT - Code-Level Optimizations

### 6. Split Hero Component Loading Strategy

**Current**: Hero loads and animates immediately, blocking interactivity

**New Timeline**:
```
0.0s → Page loads
0.5s → Navbar interactive ✅
1.0s → Static hero visible ✅
2.0s → Assembly animation loads (lazy) ✅
2.5s → Animation starts ✅
```

#### Implementation:

**File**: `sections/hero-section.tsx`

```tsx
const [showAnimatedHero, setShowAnimatedHero] = useState(false)

// Load static hero immediately
const StaticHero = dynamic(() => import('./HeroStatic'), { ssr: false })

// Load animated hero lazily
const AnimatedHero = dynamic(() => import('./HeroAnimated'), { ssr: false })

useEffect(() => {
  // Use requestIdleCallback to defer animation loading
  const id = requestIdleCallback(() => {
    setShowAnimatedHero(true)
  }, { timeout: 2000 })
  
  return () => cancelIdleCallback(id)
}, [])

return (
  <>
    {!showAnimatedHero && <StaticHero />}
    {showAnimatedHero && <AnimatedHero />}
  </>
)
```

#### Files to Create:
- `sections/HeroStatic.tsx` - Uses `hero_static.glb`
- `sections/HeroAnimated.tsx` - Uses `hero_assembly.glb`

---

### 7. Idle Warm-Up System (Replace Bulk Preload)

**Current**: All models preload upfront with `Promise.all()`

**Problem**: Blocks main thread

**Solution**: Progressive idle-time warm-up

#### Create New Hook:

**File**: `lib/useWarmModels.ts`

```tsx
import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function useWarmModels(models: string[]) {
  useEffect(() => {
    let i = 0
    
    function warmNext() {
      if (i >= models.length) return
      
      // Preload one model at a time during idle
      useGLTF.preload(models[i++])
      
      // Schedule next warm-up during idle time
      requestIdleCallback(warmNext, { timeout: 500 })
    }
    
    // Start warming after initial render
    requestIdleCallback(warmNext, { timeout: 1000 })
  }, [models])
}
```

#### Usage in `app/page.tsx`:

```tsx
// Replace current preload3DModels() with:
useWarmModels([
  "/models/prayan_final.glb",
  "/models/abhyan_final.glb",
  "/models/vidyaanAR-v3_final.glb",
  "/models/akshayaan_final.glb",
  "/models/nabhyaan_final.glb",
  "/models/jatayu_final.glb",
])
```

**Benefits**:
- Non-blocking
- Uses idle CPU time
- Doesn't delay interactivity

---

### 8. GPU Upload Warm-Up (Critical for Scroll Performance)

**Problem**: Models loaded in memory but not uploaded to GPU = scroll hitch

**Solution**: Offscreen Canvas that pre-uploads to GPU

#### Create Component:

**File**: `components/GPUWarmup.tsx`

```tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function WarmModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} visible={false} />
}

export function GPUWarmup({ models }: { models: string[] }) {
  return (
    <Canvas 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}
      frameloop="demand"
    >
      {models.map(url => (
        <WarmModel key={url} url={url} />
      ))}
    </Canvas>
  )
}
```

#### Usage in `app/page.tsx`:

```tsx
{allAssetsReady && (
  <GPUWarmup models={[
    "/models/prayan_final.glb",
    "/models/abhyan_final.glb",
    // ... all models
  ]} />
)}
```

**Result**: Zero scroll hitching when reaching 3D sections

---

### 9. Force Shader Compilation

**Add to warm-up system**

**File**: `components/GPUWarmup.tsx`

```tsx
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function WarmModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const { gl, camera } = useThree()
  
  useEffect(() => {
    if (scene) {
      // Force shader compilation
      gl.compile(scene, camera)
    }
  }, [scene, gl, camera])
  
  return <primitive object={scene} visible={false} />
}
```

**Benefit**: Eliminates first-frame shader compile stutter

---

### 10. Canvas Frame Loop Optimization

**Current**: Canvas always rendering (even when not visible)

**Solution**: Render on-demand with IntersectionObserver

#### Implementation:

**File**: `components/three/RoverCanvas.tsx`

```tsx
import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export function RoverCanvas({ onLoaded }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div ref={containerRef}>
      <Canvas
        frameloop={isVisible ? "always" : "demand"}
        // ... other props
      >
        <RoverScene onLoaded={onLoaded} />
      </Canvas>
    </div>
  )
}
```

**Apply to all Canvas instances** in:
- `sections/our-rover.tsx`
- `sections/our-drone.tsx`

**Benefit**: Saves 50-70% GPU/CPU when scrolled away

---

### 11. One-Canvas Architecture (Advanced)

**Problem**: Multiple `<Canvas>` = Multiple WebGL contexts = High memory

**Solution**: Single shared Canvas with content swapping

#### Strategy:
- Keep ONE Canvas mounted
- Swap scene content based on scroll position
- Use portals for positioning

#### Implementation (Complex - Lower Priority):

**File**: `components/three/UnifiedCanvas.tsx`

```tsx
export function UnifiedCanvas() {
  const [activeScene, setActiveScene] = useState('hero')
  
  return (
    <Canvas frameloop="demand">
      {activeScene === 'hero' && <HeroScene />}
      {activeScene === 'rover1' && <RoverScene1 />}
      {activeScene === 'rover2' && <RoverScene2 />}
      {/* ... etc */}
    </Canvas>
  )
}
```

**Note**: This is a major refactor. Only do if other optimizations insufficient.

---

### 12. Disable Antialiasing After Hero

**Why**: Antialiasing is expensive, only needed for hero close-up

#### Implementation:

**File**: `sections/our-rover.tsx`, `sections/our-drone.tsx`

```tsx
<Canvas
  gl={{
    antialias: false,  // Disable for non-hero sections
    powerPreference: 'high-performance',
    // ... other settings
  }}
/>
```

**Keep antialiasing only in hero**:
- `components/three/RoverCanvas.tsx` (hero) - `antialias: true`
- All other Canvas instances - `antialias: false`

**Benefit**: 15-25% performance gain in secondary 3D sections

---

### 13. Animation Cost Reduction

**Problem**: Real assembly animation is heavy (per-frame calculations)

**Solution**: Fake it with simple transforms

#### Current Animation Issues:
- Per-frame mesh traversal
- Material cloning in loops
- Skeleton recalculations

#### Replace With:

**File**: `components/three/Rover.tsx`

```tsx
// Instead of complex assembly animation:
const parts = useMemo(() => [
  { name: 'body', startPos: [0, -2, 0], endPos: [0, 0, 0], delay: 0 },
  { name: 'wheel1', startPos: [-3, 0, 0], endPos: [-1, 0, 0], delay: 0.2 },
  { name: 'wheel2', startPos: [3, 0, 0], endPos: [1, 0, 0], delay: 0.2 },
  // ... etc
], [])

// Animate with simple position lerp
useFrame((state, delta) => {
  parts.forEach(part => {
    const mesh = scene.getObjectByName(part.name)
    if (mesh && progress > part.delay) {
      mesh.position.lerp(part.endPos, 0.1)
    }
  })
})
```

**Benefits**:
- 50-70% less CPU usage during animation
- Smoother animation
- No frame drops

---

## 📋 Implementation Checklist

### Phase 1: Asset Preparation (Do First)
- [ ] Split hero into `hero_static.glb` + `hero_assembly.glb`
- [ ] Run Draco compression on all 7 models
- [ ] Run texture optimization (KTX2)
- [ ] Run mesh simplification (50% reduction)
- [ ] Optimize materials in Blender (≤4 per model)

### Phase 2: Code Updates (After Assets Ready)
- [ ] Create `lib/useWarmModels.ts` hook
- [ ] Replace bulk preload with idle warm-up
- [ ] Create `components/GPUWarmup.tsx`
- [ ] Add GPU warm-up to page
- [ ] Split hero into Static + Animated components
- [ ] Add shader compilation to warm-up

### Phase 3: Canvas Optimization
- [ ] Add frameloop="demand" with IntersectionObserver
- [ ] Disable antialiasing in non-hero sections
- [ ] Simplify assembly animation (fake transforms)

### Phase 4: Testing & Validation
- [ ] Test load time (target: 2-3s)
- [ ] Test scroll performance (target: 60fps)
- [ ] Test memory usage (target: <600MB)
- [ ] Test on mobile devices

---

## 🎯 Expected Results

| Metric              | Current  | After Phase 1 | After Phase 2-3 |
| ------------------- | -------- | ------------- | --------------- |
| **TTI**             | 5-8s     | 3-4s          | **2-3s**        |
| **First Paint**     | 2-3s     | 0.8s          | **0.5s**        |
| **Scroll Hitch**    | 100-300ms| 50-100ms      | **0-50ms**      |
| **Memory Usage**    | 700MB    | 500MB         | **400MB**       |
| **Mobile Usability**| Poor     | Fair          | **Good**        |

---

## ⚠️ Critical Notes

1. **Asset re-authoring is mandatory** - Code optimizations alone won't achieve 2-3s load
2. **Test after each phase** - Don't skip validation
3. **Backup original files** - Keep non-optimized versions
4. **Mobile test early** - Desktop performance doesn't predict mobile
5. **Use Chrome DevTools Performance tab** - Profile before/after each change

---

## 🚀 Priority Order (If Time Limited)

**Must Do** (80% of gains):
1. Split hero model
2. Draco compression
3. Idle warm-up hook
4. GPU warm-up component

**Should Do** (15% of gains):
5. Texture optimization
6. Mesh simplification
7. frameloop="demand"

**Nice to Have** (5% of gains):
8. Disable antialiasing
9. Fake assembly animation
10. One-canvas architecture

---

**Next Steps**: Start with Phase 1 (Asset Preparation) using Blender and gltf-transform CLI tools.

