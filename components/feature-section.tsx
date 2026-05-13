import {
  Leaf,
  Sprout,
  Recycle,
  Store,
  BookOpen,
  Users,
} from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Bebas Pestisida",
    description:
      "Ditamam dalam lingkungan terkontrol tanpa menggunakan bahan kimia berbahaya.",
  },
  {
    icon: Sprout,
    title: "Fresh from Greenhouse",
    description:
      "Dipanen sesaat sebelum dikirim untuk menjamin kesegaran dan nutrisi maksimal.",
  },
  {
    icon: Recycle,
    title: "Ramah Lingkungan",
    description:
      "Sistem hidroponik yang menghemat air hingga 90% dibandingkan pertanian konvensional.",
  },
  {
    icon: Store,
    title: "Mendukung UMKM",
    description:
      "Membeli produk kami berarti Anda mendukung ekonomi lokal dan kesejahteraan petani.",
  },
  {
    icon: BookOpen,
    title: "Edukasi Pertanian",
    description:
      "Menyediakan sarana belajar bagi masyarakat yang ingin memulai urban farming.",
  },
  {
    icon: Users,
    title: "Pemberdayaan Perempuan",
    description:
      "Dikelola 100% oleh kelompok wanita untuk meningkatkan kemandirian ekonomi.",
  },
]

export default function FeatureSection() {
  return (
    <section className="bg-background custom">
      <div className="container-custom">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-primary">
            Keunggulan Kami
          </h2>

          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Komitmen KWT Dorang Cinta untuk kualitas terbaik dan
            dampak sosial yang positif.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}