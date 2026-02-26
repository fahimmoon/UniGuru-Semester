import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text, Line } from '@react-three/drei';
import { useLanguage } from '../context/LanguageContext';

const Node = ({ position, label }: { position: [number, number, number], label: string }) => (
  <group position={position}>
    <Sphere args={[0.3, 32, 32]}>
      <meshStandardMaterial color="#00A651" />
    </Sphere>
    <Text
      position={[0, 0.6, 0]}
      fontSize={0.2}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {label}
    </Text>
  </group>
);

const StarTopology = () => (
  <group>
    <Node position={[0, 0, 0]} label="Hub" />
    {[0, 1, 2, 3, 4].map((i) => {
      const angle = (i / 5) * Math.PI * 2;
      const x = Math.cos(angle) * 3;
      const z = Math.sin(angle) * 3;
      return (
        <React.Fragment key={i}>
          <Node position={[x, 0, z]} label={`PC ${i + 1}`} />
          <Line points={[[0, 0, 0], [x, 0, z]]} color="gray" lineWidth={1} />
        </React.Fragment>
      );
    })}
  </group>
);

export const Topology3D: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t('3D Star Topology', 'تھری ڈی اسٹار ٹوپولوجی')}</h2>
        <p className="text-sm text-gray-500 mb-6">{t('Rotate and explore the network structure', 'نیٹ ورک کے ڈھانچے کو گھمائیں اور دریافت کریں')}</p>
        
        <div className="h-80 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden cursor-move">
          <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <StarTopology />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        
        <div className="mt-4 p-4 bg-pak-green/5 rounded-xl border border-pak-green/10">
          <p className="text-xs text-gray-600 leading-relaxed italic">
            {t('In a Star topology, all devices connect to a central hub. If the hub fails, the whole network goes down.', 'اسٹار ٹوپولوجی میں، تمام آلات ایک مرکزی حب سے جڑتے ہیں۔ اگر حب فیل ہو جائے تو پورا نیٹ ورک ڈاؤن ہو جاتا ہے۔')}
          </p>
        </div>
      </div>
    </div>
  );
};
