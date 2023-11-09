import { SVGProps } from 'react';

const AlertCircle = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.875 4C7.0782 4 4 7.07737 4 10.875V13.125C4 16.9226 7.0782 20 10.875 20H13.125C16.9218 20 20 16.9226 20 13.125V10.875C20 7.07737 16.9218 4 13.125 4H10.875ZM2 10.875C2 5.97263 5.9738 2 10.875 2H13.125C18.0262 2 22 5.97263 22 10.875V13.125C22 18.0274 18.0262 22 13.125 22H10.875C5.9738 22 2 18.0274 2 13.125V10.875ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7ZM13 16C13 15.447 12.552 15 12 15C11.448 15 11 15.447 11 16C11 16.553 11.448 17 12 17C12.552 17 13 16.553 13 16Z"
            fill="currentColor"
        />
    </svg>
);

export default AlertCircle;
