import { CheckIcon, ZapIcon } from 'lucide-react';

const features = [
  'შეუზღუდავი დიზაინის მოთხოვნები',
  'შეუზღუდავი რევიზიები',
  'ერთდროულად მუშავდება ერთი მოთხოვნა',
  '2-3 სამუშაო დღეში შესრულება',
  'ბრენდინგი, ვებსაიტის/UI დიზაინი, სოციალური მედია და ბეჭდური მასალები',
  'Figma, Illustrator, Photoshop, InDesign',
  'საწყისი ფაილები და სრული საკუთრების უფლება',
  'შეჩერება ან გაუქმება ნებისმიერ დროს',
];

export function Pricing() {
  return (
    <section id="pricing" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            ერთი პაკეტი. ყველაფერი რაც გჭირდება.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-black/55">
            არანაირი ტარიფები, ინდივიდუალური შეთავაზებები ან დამატებითი
            მოლაპარაკებები.
          </p>
        </div>

        <div className="mesh-warm mt-10 rounded-card p-2">
          <div className="rounded-[18px] bg-white p-7 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold tracking-[-0.01em] text-ink">
                  ყოველთვიური წევრობა
                </h3>
                <p className="mt-1 text-sm text-black/55">
                  ყველაფერი ერთ პაკეტში, ყოველთვიური გადახდით.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white">
                <ZapIcon
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                დარჩენილია 2 ადგილი
              </span>
            </div>

            <p className="mt-7 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-[-0.03em] text-ink sm:text-6xl">
                777₾
              </span>
              <span className="text-base font-medium text-black/50">
                /თვეში
              </span>
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5"
                >
                  <CheckIcon
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-snug text-black/70">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-9 inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-4 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              დაწყება
            </a>

            <p className="mt-4 text-center text-[13px] text-black/45">
              ონბორდინგი დაახლოებით 1 საათს მოითხოვს. პირველი შედეგი 3 დღეში.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}