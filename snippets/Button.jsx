/**
 * @param {object} props
 * @param {string} props.href
 * @param {string} props.label
 * @param {?string} props.icon
 * @param {?string} props.className
 */
export const Button = ({ icon, href, label, className }) => {
    let buttonClasses = 'flex py-3 px-6 text-md font-medium rounded-xl items-center justify-center hover:opacity-90';
    if (className) buttonClasses += ` ${className}`;

    return (
        <a href={href} target="_blank">
            <button className={buttonClasses}>
                {icon && <Icon icon={icon} className="mr-2"/>}
                <span>{label}</span>
            </button>
        </a>
    );
};
