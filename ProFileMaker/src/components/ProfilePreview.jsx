import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Animation configurations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const templateTransition = {
  type: "spring",
  damping: 20,
  stiffness: 100
};

const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse"
  }
};

const hoverScale = {
  scale: 1.03,
  transition: { type: "spring", stiffness: 400 }
};

const tapScale = {
  scale: 0.98
};

export default function ProfilePreview() {
  const [activeTemplate, setActiveTemplate] = useState(0);

  const templates = [
    {
      name: "Modern Professional",
      colors: {
        primary: '#3B82F6',
        background: '#FFFFFF',
        text: '#1F2937',
        accent: '#E5E7EB'
      },
      style: 'minimal'
    },
    {
      name: "Creative Portfolio",
      colors: {
        primary: '#8B5CF6',
        background: '#F5F3FF',
        text: '#4C1D95',
        accent: '#DDD6FE'
      },
      style: 'creative'
    },
    {
      name: "Tech Innovator",
      colors: {
        primary: '#06B6D4',
        background: '#ECFEFF',
        text: '#164E63',
        accent: '#A5F3FC'
      },
      style: 'tech'
    }
  ];

  const currentTemplate = templates[activeTemplate];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
      className="mt-16 md:mt-24 mx-auto max-w-4xl px-4"
    >
      {/* Template selector with animated buttons */}
      <motion.div className="flex flex-wrap gap-2 mb-6 justify-center">
        {templates.map((template, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTemplate(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTemplate === index
                ? 'text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            style={activeTemplate === index ? {
              backgroundColor: currentTemplate.colors.primary
            } : {}}
            variants={item}
            whileHover={hoverScale}
            whileTap={tapScale}
            animate={{
              scale: activeTemplate === index ? [1, 1.1, 1] : 1
            }}
            transition={{
              scale: { duration: 0.3 }
            }}
          >
            {template.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Animated template preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTemplate}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: templateTransition
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 }
          }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: currentTemplate.colors.background,
            color: currentTemplate.colors.text,
            border: `1px solid ${currentTemplate.colors.accent}`
          }}
          whileHover={{
            boxShadow: `0 20px 25px -5px ${currentTemplate.colors.primary}20`
          }}
        >
          {/* Profile header */}
          <motion.div
            key={activeTemplate + '-header'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start border-b"
            style={{ borderColor: currentTemplate.colors.accent }}
            variants={item}
          >
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: currentTemplate.colors.primary }}
              animate={pulse}
            >
              <UserIcon className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: currentTemplate.colors.primary }}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Jamie Abassy
              </motion.h2>
              <motion.p
                className="text-lg mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Senior Product Designer
              </motion.p>
              <motion.p
                className="opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.4 }}
              >
                Creating user-centered digital experiences with beautiful interfaces.
              </motion.p>
            </div>
          </motion.div>

          {/* Profile content */}
          <motion.div
            className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Left column */}
            <div className="md:col-span-2 space-y-6">
              <motion.div className="space-y-2" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  About
                </h3>
                <p>
                  Passionate designer with 8+ years of experience at companies like
                  Adobe and Airbnb. Specializing in design systems and prototypes.
                </p>
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BriefcaseIcon className="w-5 h-5" />
                  Experience
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Lead Product Designer</h4>
                    <p className="text-sm opacity-70">TechStart Inc. • 2020-Present</p>
                  </div>
                  <div>
                    <h4 className="font-medium">UI/UX Designer</h4>
                    <p className="text-sm opacity-70">Adobe • 2017-2020</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <motion.div className="space-y-2" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CodeBracketIcon className="w-5 h-5" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: currentTemplate.colors.accent,
                        color: currentTemplate.colors.text
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <EnvelopeIcon className="w-5 h-5" />
                  Contact
                </h3>
                <div className="space-y-1">
                  <p>jamie@example.com</p>
                  <p>linkedin.com/in/jamieabassy</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Animated CTA */}
      <motion.div
        className="mt-8 text-center"
        variants={item}
      >
        <motion.a
          href="/templates"
          className="inline-flex items-center px-6 py-3 rounded-md font-medium gap-2"
          style={{
            backgroundColor: currentTemplate.colors.primary,
            color: 'white'
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 5px 15px ${currentTemplate.colors.primary}80`
          }}
          whileTap={tapScale}
        >
          Browse All Templates
          <ArrowRightIcon className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
