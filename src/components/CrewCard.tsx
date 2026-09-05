import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { CrewMember } from '../data/crew';

type CrewCardProps = {
  member: CrewMember;
  index: number;
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
  scrollYProgress: MotionValue<number>;
};

export function CrewCard({
  member,
  index,
  hoveredIndex,
  onHoverChange,
  scrollYProgress,
}: CrewCardProps) {
  const { name, role, image, rotate, offsetY, overlap, z, featured } = member;

  const drift = featured ? 10 : 7 + (index % 3) * 2;
  const duration = 4.6 + (index % 4) * 0.7;

  const isHovered = hoveredIndex === index;

  let shiftX = 0;

  if (hoveredIndex !== null && !isHovered) {
    const distance = index - hoveredIndex;

    const magnitude = Math.max(0, 20 - (Math.abs(distance) - 1) * 7);

    shiftX = Math.sign(distance) * magnitude;
  }

  const spreadOffsets = [-180, -130, -80, -30, 30, 80, 130, 180];
  const spreadX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, spreadOffsets[index] ?? 0]
  );

  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const scrollRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotate * 1.2]
  );

  return (
    <motion.div
      style={{
        x: spreadX,
        opacity: scrollOpacity,
        scale: scrollScale,
        rotate: scrollRotate,
        ['--card-z' as string]: z,
        marginLeft: overlap,
      }}
      className={[
        'relative shrink-0 z-[var(--card-z)] hover:z-40',
        featured
          ? 'w-[124px] sm:w-[150px] lg:w-[164px]'
          : 'w-[112px] sm:w-[138px] lg:w-[152px]',
      ].join(' ')}
    >
      <motion.div
        animate={{ x: shiftX }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 22,
          mass: 0.7,
        }}
        onMouseEnter={() => onHoverChange(index)}
        onMouseLeave={() => onHoverChange(null)}
        onFocus={() => onHoverChange(index)}
        onBlur={() => onHoverChange(null)}
      >
        {/* entrance */}
        <motion.div
          initial={{
            opacity: 0,
            y: 44,
            rotate: rotate * 1.6,
          }}
          animate={{
            opacity: 1,
            y: offsetY,
            rotate,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15 + index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* continuous float */}
          <motion.div
            animate={{
              y: [0, -drift, 0],
              rotate: [
                0,
                rotate > 0 ? -1.4 : 1.4,
                0,
              ],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: index * 0.35,
            }}
          >
            {/* hover lift + zoom */}
            <motion.figure
              animate={
                isHovered
                  ? {
                      y: -14,
                      scale: 1.06,
                      rotate: rotate * -0.35,
                    }
                  : {
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 18,
                mass: 0.6,
              }}
              className="group relative w-full cursor-pointer overflow-hidden rounded-[22px] border border-ink/20 bg-ink/[0.08] shadow-[0_22px_55px_-22px_rgba(0,0,0,0.85)] ring-1 ring-ink/10 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_35px_75px_-24px_rgba(92,125,255,0.48)]"
              style={{ aspectRatio: '3 / 4' }}
            >
              <img
                src={image}
                alt={`${name}, ${role}`}
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.12]"
                loading="lazy"
              />
            </motion.figure>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
