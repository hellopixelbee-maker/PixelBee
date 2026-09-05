import { CheckIcon, ArrowUpRightIcon } from 'lucide-react';

const price = 499;
const durationDays = 30;

const features = [
  'შეუზღუდავი დიზაინის მოთხოვნები',
  'შეუზღუდავი რევიზიები',
  'ერთდროულად მუშავდება ერთი მოთხოვნა',
  '2–3 სამუშაო დღეში შესრულება',
  'ბრენდინგი, ვებ/UI დიზაინი და სოციალური მედია',
  'Figma, Illustrator, Photoshop და InDesign',
  'საწყისი ფაილები და სრული საკუთრების უფლება',
  '30 დღის შემდეგ ხელით განახლების შესაძლებლობა',
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <div aria-hidden="true" className="section-glow -left-52 top-24" />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
            გამჭვირვალე ფასი
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-ink sm:text-6xl">
            ერთი პაკეტი.
            <span className="text-gradient block">ყველაფერი რაც გჭირდება.</span>
          </h2>
        </div>

        <div className="glass-panel mt-12 overflow-hidden rounded-[28px] sm:mt-16 sm:rounded-[34px]">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative flex flex-col overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#172449]/90 via-[#101a35]/90 to-[#0a1021]/90 p-7 text-white sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <span aria-hidden="true" className="absolute -right-28 -top-32 h-80 w-80 rounded-full bg-accent/20 blur-[90px]" />
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-white/65">
                  Design Subscription
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7ee787] shadow-[0_0_12px_#7ee787]" />
                  2 ადგილი
                </span>
              </div>

              <div className="mt-14 sm:mt-20">
                <p className="flex items-end gap-2">
                  <span className="text-gradient text-6xl font-bold tracking-[-0.055em] sm:text-7xl">
                    {price}₾
                  </span>
                  <span className="mb-2 text-sm font-medium text-white/45">
                    / {durationDays} დღე
                  </span>
                </p>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
                  ერთჯერადი გადახდა {durationDays}-დღიანი წვდომისთვის. ავტომატური
                  განახლებისა და გრძელვადიანი კონტრაქტის გარეშე.
                </p>
              </div>

              <a
                href="#contact"
                className="group relative mt-10 inline-flex w-full items-center justify-between rounded-full border border-white/15 bg-white/10 px-6 py-4 text-[15px] font-semibold text-white backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:mt-auto"
              >
                დაგვიკავშირდი
                <ArrowUpRightIcon
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              <div className="border-b border-ink/10 pb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/70">
                  პაკეტში შედის
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-ink sm:text-3xl">
                  ყველაფერი ძლიერი ბრენდისთვის
                </h3>
              </div>

              <ul className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                      <CheckIcon
                        className="h-3 w-3 text-accent"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-[14px] leading-relaxed text-ink/60">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/35 sm:flex-row sm:items-center sm:justify-between">
                <span>ონბორდინგი დაახლოებით 1 საათში</span>
                <span>პირველი შედეგი 2–3 სამუშაო დღეში</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
