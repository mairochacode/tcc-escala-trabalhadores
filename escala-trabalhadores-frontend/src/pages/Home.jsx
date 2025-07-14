import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden font-sans">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/waves.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo HTML5.
      </video>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1
            style={{ color: "#fff" }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
          >
            Bem-vindo à <span style={{ color: "#fff" }}>Waves</span>
          </h1>

          <p
            style={{ color: "#eee" }}
            className="text-xl md:text-2xl mb-10 leading-relaxed drop-shadow-sm"
          >
            A revolução digital na escala de trabalhadores portuários.
          </p>

          {/* Botão moderno e maior */}
          <a
            href="/login"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "1rem 2.5rem",
              marginTop: "1rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "9999px",
              border: "2px solid #fff",
              display: "inline-block",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#000";
            }}
          >
            Acessar Sistema
          </a>
        </motion.div>
      </div>
    </main>
  );
}
