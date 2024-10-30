interface UnitProps {
  setUnits: (unit: string) => void;
}

const Unit = ({ setUnits }: UnitProps) => {
  return (
    <div className="unit">
      <button onClick={() => {setUnits("metric")}}>צלזיוס</button>
      <button onClick={() => {setUnits("imperial")}}>פרהנייט</button>
    </div>
  );
};

export default Unit;
