// src/components/CardDetails.tsx

interface CardDetailProps {
  id: number;
}

const CardDetail: React.FC<CardDetailProps> = ({ id }) => {
  return (
    <section className="widgets-section">
      <h2>Card Details Id {id}</h2>
    </section>
  );
};

export default CardDetail;
