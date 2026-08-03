import { motion } from 'framer-motion';
import type { CrewMember } from '../data/crew';

type CrewCardProps = {
  member: CrewMember;
  index: number;
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
};

export function CrewCard({
  member,
  index,
  hoveredIndex,
  onHoverChange
}: CrewCardProps) {
  const { name, role, image, rotate, offsetY, overlap, z, featured } = member;

  // Gentle, slightly varied drift so the fan feels alive rather than pasted down.
  const drift = featured ? 10 : 7 + index % 3 * 2;
  const duration = 4.6 + index % 4 * 0.7;

  // Neighbours of a hovered card step aside, with the push falling off by distance.
  const isHovered = hoveredIndex === index;
  let shiftX = 0;
  if (hoveredIndex !== null && !isHovered) {
    const distance = index - hoveredIndex;
    const magnitude = Math.max(0, 20 - (Math.abs(distance) - 1) * 7);
    shiftX = Math.sign(distance) * magnitude;
  }

  return (
    <motion.div
      animate={{ x: shiftX }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.7 }}
      onMouseEnter={() => onHoverChange(index)}
      onMouseLeave={() => onHoverChange(null)}
      onFocus={() => onHoverChange(index)}
      onBlur={() => onHoverChange(null)}
      className={[
      'relative shrink-0 z-[var(--card-z)] hover:z-40',
      featured ?
      'w-[124px] sm:w-[150px] lg:w-[164px]' :
      'w-[112px] sm:w-[138px] lg:w-[152px]'].
      join(' ')}
      style={{ ['--card-z' as string]: z, marginLeft: overlap }}>
      
      {/* entrance */}
      <motion.div
        initial={{ opacity: 0, y: 44, rotate: rotate * 1.6 }}
        animate={{ opacity: 1, y: offsetY, rotate }}
        transition={{
          duration: 0.7,
          delay: 0.15 + index * 0.06,
          ease: [0.16, 1, 0.3, 1]
        }}>
        
        {/* continuous float */}
        <motion.div
          animate={{ y: [0, -drift, 0], rotate: [0, rotate > 0 ? -1.4 : 1.4, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: index * 0.35
          }}>
          
          {/* hover lift + zoom */}
          <motion.figure
            animate={
            isHovered ?
            { y: -14, scale: 1.06, rotate: rotate * -0.35 } :
            { y: 0, scale: 1, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.6 }}
            className="group relative w-full cursor-pointer overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_-18px_rgba(120,84,60,0.45)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_34px_60px_-22px_rgba(120,84,60,0.6)]"
            style={{ aspectRatio: '3 / 4' }}>
            
            <img
              src={image}
              alt={`${name}, ${role}`}
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.12]"
              loading="lazy" />
            
          </motion.figure>
        </motion.div>
      </motion.div>
    </motion.div>);

}