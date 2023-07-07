import { motion } from 'framer-motion';

const ImageComponent = ({ src }) => {
    return (
        <motion.div
            className="container w-12 h-0 pb-2/3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <img
                src={src}
                alt="Image"
                className="w-full h-full object-cover"
            />
        </motion.div>
    );
};

export default ImageComponent;
