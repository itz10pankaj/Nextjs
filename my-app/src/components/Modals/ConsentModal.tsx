export default function Modal({ message, onYes, onNo, isOpen }:any) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-yes" onClick={onYes}>Yes</button>
          <button className="modal-no" onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
}
