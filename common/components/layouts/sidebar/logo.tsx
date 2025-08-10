import { motion } from "framer-motion"; // Diperbaiki dari 'motion/react' ke 'framer-motion' untuk konsistensi

export const LogoArsha = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-6 w-6 shrink-0 rounded-md bg-green-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre text-lg font-bold text-black dark:text-white"
      >
        ARSHA
      </motion.span>
    </div>
  );
};
export const LogoIconSarah = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-6 w-6 shrink-0 rounded-md bg-green-500" />
    </div>
  );
};