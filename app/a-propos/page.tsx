import Link from "next/link"
import Image from "next/image"
import { CartIcon } from "@/components/cart-icon"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-black">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gold-500">HEALTHY JOY</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              Accueil
            </Link>
            <Link href="/produits" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              Nos Chocolats
            </Link>
            <Link href="/a-propos" className="text-sm font-medium text-gold-500 hover:text-gold-400 underline">
              À Propos
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <CartIcon />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/History2.jpg"
            alt="Background pattern"
            width={1080}
            height={1920}
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gold-500">
                Notre Histoire
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl mx-auto">
                Découvrez l'histoire de HEALTHY JOY, notre passion pour le chocolat artisanal et notre engagement envers
                la qualité et le bien-être.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-12 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-800">
              <Image
                src="/History.jpg"
                alt="Fondateurs de CACAO LUXE"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gold-500">De la passion à l'excellence</h2>
              <p className="text-gray-300">
                HEALTHY JOY est né en 2025 de la passion de cinq amis d'étude, Firdaous, Ikram , Khouloud ,Hajar et Manar, pour le chocolat
                artisanal. Après des années d'expérience dans la pâtisserie de luxe et la nutrition, ils ont décidé
                d'unir leurs talents pour créer une marque de chocolat qui allie plaisir gustatif et bien-être.
              </p>
              <p className="text-gray-300">
                Notre mission est simple : proposer des chocolats d'exception, fabriqués à partir d'ingrédients naturels
                et sans sucres ajoutés, pour que vous puissiez vous faire plaisir sans culpabilité.
              </p>
              <p className="text-gray-300">
                Chaque palette de chocolat est élaborée avec soin dans notre atelier tangerois, en petites séries pour
                garantir une qualité irréprochable et une fraîcheur optimale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-12 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-gold-500">Nos Valeurs</h2>
            <p className="max-w-[700px] text-gray-300 md:text-lg">
              Chez HEALTHY JOY, nous sommes guidés par des valeurs fortes qui se reflètent dans chacune de nos créations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gold-800 bg-black/50">
              <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Qualité</h3>
              <p className="text-gray-300">
                Nous sélectionnons les meilleures fèves de cacao et ingrédients biologiques pour créer des chocolats
                d'exception.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gold-800 bg-black/50">
              <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Bien-être</h3>
              <p className="text-gray-300">
                Nous créons des chocolats sains, sans sucres ajoutés, pour que vous puissiez vous faire plaisir tout en
                prenant soin de votre santé.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gold-800 bg-black/50">
              <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M3 6v18h18" />
                  <path d="M7 10v14" />
                  <path d="M11 6v18" />
                  <path d="M15 10v14" />
                  <path d="M19 6v18" />
                  <path d="M3 10h18" />
                  <path d="M3 14h18" />
                  <path d="M3 18h18" />
                  <path d="M3 22h18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Durabilité</h3>
              <p className="text-gray-300">
                Nous nous engageons à utiliser des ingrédients issus du commerce équitable et des emballages
                éco-responsables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}

      <section className="w-full py-12 bg-gradient-to-b from-gray-950 to-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-gold-500">Notre Équipe</h2>
            <p className="max-w-[700px] text-gray-300 md:text-lg">
              Découvrez les artisans passionnés qui créent vos chocolats avec amour et expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Ikram el fernani", role: "CEO", src: "/ikram.jpg" },
              { name: "Firdaous Aarab", role: "Responsable Produit", src: "/firdaous.jpg" },
              { name: "Khouloud Ben Sellam", role: "Responsable Commercial", src: "/khouloud.jpg" },
              { name: "Hajar Elharmouch", role: "Responsable Achat", src: "/hajar.jpg" },
              { name: "Manar Saidi", role: "Responsable Financière", src: "/manar.jpg" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-40 h-40 relative rounded-full overflow-hidden mb-3  border-2 border-gold-500">
                  <Image
                    src={member.src}
                    alt={member.name}
                    width={270}
                    height={360}
                    className="object-cover "
                  />
                </div>
                <h3 className="text-lg font-bold text-gold-500">{member.name}</h3>
                <p className="text-gold-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-black border-t border-gold-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">HEALTHY JOY</h3>
              <p className="text-sm text-gray-400">
                Des chocolats healthy, élégants et délicieux pour tous les amateurs de douceurs.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">Navigation</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="text-sm text-gray-400 hover:text-gold-400">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/produits" className="text-sm text-gray-400 hover:text-gold-400">
                    Nos Chocolats
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="text-sm text-gray-400 hover:text-gold-400">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-gold-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">Légal</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/mentions-legales" className="text-sm text-gray-400 hover:text-gold-400">
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="text-sm text-gray-400 hover:text-gold-400">
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cgv" className="text-sm text-gray-400 hover:text-gold-400">
                    CGV
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">Contact</h3>
              <ul className="space-y-1">
                <li className="text-sm text-gray-400">khouloudbensellam78@gmail.com</li>
                <li className="text-sm text-gray-400">+212 648687864</li>
                <li className="text-sm text-gray-400">Tanger, Maroc</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-gold-900 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} HEALTHY JOY. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
