// @ts-check

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 */
export const Header = ({ title, description }) => (
    <div className="text-center mb-12">
        <h2 className="mb-4 text-5xl font-bold text-gray-100">{title}</h2>
        <p className="text-xl text-gray-300">{description}</p>
    </div>
);
