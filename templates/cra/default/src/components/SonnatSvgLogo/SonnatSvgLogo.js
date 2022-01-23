import Icon from "@sonnat/ui/Icon";

const componentName = "SonnatSvgLogo";

const SonnatSvgLogo = props => {
  return (
    <Icon {...props} viewBox="0 0 24 24" title="Sonnat Design System's Logo">
      <circle cx="12" cy="12" r="12" fill="#EE3F7C" />
      <path
        opacity="0.9"
        d="M16.9083 16.9846L10.114 18.8895V18.8895C9.35206 19.1435 8.52659 18.953 7.95511 18.3815L5.98669 16.4131C5.79619 16.2226 5.92319 15.9686 6.11368 15.9051L12.2095 14.2542C12.3999 14.1907 12.5269 14.2542 12.6539 14.3812L14.8129 16.5401C15.2573 16.9846 15.7653 17.175 16.3368 17.175C16.5273 17.0481 16.7178 17.0481 16.9083 16.9846Z"
        fill="#E5E5E5"
      />
      <path
        opacity="0.84"
        d="M17.8607 13.4285L13.7969 9.36469L13.0984 8.66622V8.66622C12.6539 8.22174 12.4634 7.71375 12.4634 7.14228C12.4634 6.5708 12.6539 6.06282 13.0984 5.61833V5.61833C13.2889 5.36434 13.6064 5.17385 13.9239 5.11035L7.19311 6.88829C6.87562 7.01528 6.49463 7.20577 6.17715 7.45976C5.35168 8.28523 5.35168 9.68218 6.17715 10.5077L10.3045 14.6985L10.9395 15.3335C11.384 15.778 11.5744 16.2859 11.5744 16.8574C11.5744 17.4289 11.384 17.9369 10.9395 18.3814V18.3814C10.6855 18.6353 10.368 18.8258 10.0505 18.8893L16.8447 17.0479V17.0479C17.1622 16.9844 17.5432 16.7939 17.7972 16.4764C18.2417 16.0319 18.4322 15.524 18.4322 14.9525C18.4957 14.381 18.2417 13.8095 17.8607 13.4285Z"
        fill="#F4F4F4"
      />
      <path
        opacity="0.9"
        d="M16.0828 5.61836C15.5113 5.04688 14.6858 4.85639 13.9239 5.11038V5.11038L7.19312 6.88831C7.38361 6.88831 7.5741 6.82482 7.7011 6.82482C8.27257 6.82482 8.78056 7.01531 9.22504 7.45979V7.45979L11.4475 9.68221C11.5745 9.80921 11.7649 9.8727 11.8919 9.80921L13.7334 9.30122L18.1782 8.15827C18.3687 8.09477 18.4322 7.90428 18.3052 7.77728L16.0828 5.61836Z"
        fill="white"
      />
    </Icon>
  );
};

SonnatSvgLogo.displayName = componentName;

export default SonnatSvgLogo;
