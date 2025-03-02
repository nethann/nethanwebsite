# How to imoprt 3-D models to react? 

1. Download the blender model as **.glb file**. (Make sure you apply the modifiers & only selection)
2. Drag & drop your .glb file to the **public folder** in React
3. Run the below command: 
```
npx gltfjsx@6.1.4 public/nameOfModel.glb
```
4. Once the .jsx file has been created, drag & drop the JSX file to components/Global-Components
5. Inside the parent .jsx file, change to **export default function** so you can import
