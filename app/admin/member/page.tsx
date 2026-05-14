import MemberForm from "@/components/admin/member-form";

export default function MemberPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Anggota
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola anggota dari KWT Dorang Cinta.
        </p>
      </div>

      <MemberForm />
    </div>
  )
}