import { Section, Img, Text } from "@react-email/components";

export default function EmailHeader({
  logoSrc = "https://res.cloudinary.com/ltect-homes/image/upload/v1775861776/logo_v2qhmd.jpg",
  logoAlt = "Hospital Logo",
  title = "Section Title",
  subtitle = "",
}) {
  return (
    <Section
      style={{
        textAlign: "center",
        padding: "24px 16px 32px",
        backgroundColor: "#ECFDF5", // equivalent of bg-green-50
      }}
    >
      <Img
        src={logoSrc}
        alt={logoAlt}
        width="180"
        style={{
          display: "block",
          margin: "0 auto 16px",
        }}
      />

      <Text
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#000000",
          margin: "0 0 8px",
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            fontSize: "14px",
            color: "#64748B",
            margin: 0,
          }}
        >
          {subtitle}
        </Text>
      )}
    </Section>
  );
}
