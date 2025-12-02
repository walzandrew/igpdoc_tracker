type ResetViewButtonProps = {
  onResetView: () => void;
};

export default function ResetViewButton({ onResetView }: ResetViewButtonProps) {
  return (
    <button className="btn" onClick={onResetView}>
      Reset View
    </button>
  );
}
