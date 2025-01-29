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

// Tailwind Configuration for Salmon Pink Theme
// Add this to your Tailwind CSS configuration file
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         'salmon-pink': '#FF91A4',
//       },
//     },
//   },
// };
