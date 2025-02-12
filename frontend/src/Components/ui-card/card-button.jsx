// Card Component
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  // CardContent Component
  export const CardContent = ({ children, className }) => {
    return (
      <div className={`space-y-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  // Button Component
  export const Button = ({ children, onClick, className, ...props }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-pink-400 text-black py-2 px-4 rounded-lg  transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  
  
  export const Dialog = ({ open, onOpenChange, children }) => {
    return open ? (
      <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">{children}</div>
        <button className="absolute top-4 right-4 text-black" onClick={() => onOpenChange(false)}>×</button>
      </div>
    ) : null;
  };
  
  export const DialogContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
  };
  
  export const DialogTitle = ({ children }) => {
    return <h2 className="text-lg font-semibold text-salmon-600">{children}</h2>;
  };
  
  export const Input = ({ placeholder, value, onChange, className }) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border p-2 rounded w-full ${className}`}
      />
    );
  };
