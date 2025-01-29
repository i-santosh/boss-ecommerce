// Card Component
export const Card = ({ className, children }) => {
    return (
      <div className={`rounded-2xl shadow-md p-4 ${className}`}>{children}</div>
    );
  };
  
  export const CardContent = ({ children }) => {
    return <div>{children}</div>;
  };
  
  // Button Component
  export const Button = ({ className, children, ...props }) => {
    return (
      <button
        className={`px-4 py-2 rounded-md font-medium shadow-sm ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  // Input Component
  export const Input = ({ className, ...props }) => {
    return (
      <input
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-salmon-pink-600 focus:outline-none ${className}`}
        {...props}
      />
    );
  };
  
  // Table Components
  export const Table = ({ children, className }) => {
    return (
      <table className={`w-full border-collapse ${className}`}>{children}</table>
    );
  };
  
  export const TableHeader = ({ children }) => {
    return <thead className="bg-salmon-pink-100">{children}</thead>;
  };
  
  export const TableBody = ({ children }) => {
    return <tbody>{children}</tbody>;
  };
  
  export const TableRow = ({ children, className }) => {
    return <tr className={`border-b ${className}`}>{children}</tr>;
  };
  
  export const TableHead = ({ children, className }) => {
    return (
      <th className={`text-left px-4 py-2 font-medium text-salmon-pink-700 ${className}`}>
        {children}
      </th>
    );
  };
  
  export const TableCell = ({ children, className }) => {
    return <td className={`px-4 py-2 ${className}`}>{children}</td>;
  };
  