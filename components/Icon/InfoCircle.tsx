import { SVGProps } from 'react';

const InfoCircle = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-cy="info-icon"
        {...props}
    >
        <path
            d="M10 10V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 5C10.552 5 11 5.447 11 6C11 6.553 10.552 7 10 7C9.448 7 9 6.553 9 6C9 5.447 9.448 5 10 5Z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.125 19H8.875C4.526 19 1 15.475 1 11.125V8.875C1 4.525 4.526 1 8.875 1H11.125C15.474 1 19 4.525 19 8.875V11.125C19 15.475 15.474 19 11.125 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default InfoCircle;
