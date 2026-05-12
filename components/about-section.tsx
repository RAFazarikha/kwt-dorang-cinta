import {
  Users,
  Heart,
  Leaf,
  Droplets,
} from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "30+",
    label: "Anggota Aktif",
  },
  {
    icon: Heart,
    value: "500+",
    label: "Pelanggan Setia",
  },
  {
    icon: Leaf,
    value: "100%",
    label: "Sayuran Segar",
  },
  {
    icon: Droplets,
    value: "Modern",
    label: "Hydroponic",
  },
]

export default function AboutSection() {
  return (
    <section className="bg-muted/40 custom">
      <div className="container-custom grid gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold leading-tight text-primary">
            Menanam Harapan, Menuai Masa Depan
          </h2>

          <p className="text-lg leading-8 text-muted-foreground">
            Kelompok Wanita Tani (KWT) Dorang Cinta adalah komunitas
            yang berdedikasi pada pertanian perkotaan, ketahanan pangan,
            dan pemberdayaan perempuan.
          </p>

          <p className="text-lg leading-8 text-muted-foreground">
            Melalui sistem hidroponik modern, kami mengubah lahan
            terbatas di perkotaan menjadi sumber pangan sehat dan
            berkelanjutan.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="card-modern flex flex-col items-center justify-center gap-4 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-primary">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}