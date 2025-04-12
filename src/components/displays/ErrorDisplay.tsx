
export const ErrorDisplay = ({ error,text }: { error: any,text : string }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
      <h2>Error while displaying {text}</h2>
      <p>{error.message}</p>
    </div>
  );
}