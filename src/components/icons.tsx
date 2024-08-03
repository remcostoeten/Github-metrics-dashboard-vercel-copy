function GithubLogo() {
  return (
    <svg
      className="w-3.5 aspect-square"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_93)">
        <path
          d="M6.06673 11.5903C3.15007 12.4653 3.15007 10.132 1.9834 9.84034M10.1501 13.3403V11.0828C10.1719 10.8047 10.1344 10.5251 10.0398 10.2625C9.94528 10 9.79594 9.76067 9.60173 9.56034C11.4334 9.35617 13.3584 8.662 13.3584 5.477C13.3582 4.66257 13.045 3.87937 12.4834 3.2895C12.7493 2.57697 12.7305 1.78937 12.4309 1.09034C12.4309 1.09034 11.7426 0.88617 10.1501 1.95367C8.81307 1.59132 7.40373 1.59132 6.06673 1.95367C4.47423 0.88617 3.7859 1.09034 3.7859 1.09034C3.48628 1.78937 3.46748 2.57697 3.7334 3.2895C3.16764 3.88374 2.85404 4.67402 2.8584 5.4945C2.8584 8.65617 4.7834 9.35034 6.61506 9.57784C6.42315 9.77615 6.27514 10.0127 6.18066 10.272C6.08619 10.5313 6.04737 10.8075 6.06673 11.0828V13.3403"
          stroke="white"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_93">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.816711 0.507019)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function Dots() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      className="bi bi-three-dots-vertical"
      viewBox="0 0 16 16"
    >
      <path d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
    </svg>
  );
}

export { GithubLogo, Dots };
