export default function SectionHeader({
  logoSrc = "/logo-ling.webp",
  logoAlt = "Logo",
  title = "Section Title",
  subtitle = "",
  bgColor = "bg-green-50",
  animate = "animate-fadeIn",
}) {
  return (
    <div className={`text-center px-6 py-6 pb-8 ${bgColor} ${animate}`}>
      <img src={logoSrc} alt={logoAlt} className="h-14 md:h-20 mx-auto mb-3" />
      <h1 className="text-2xl md:text-3xl text-black font-semibold bg-clip-text mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-600 text-sm sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}
