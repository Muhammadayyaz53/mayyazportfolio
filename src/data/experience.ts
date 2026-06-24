export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  duration: string;
  year: string;
  responsibilities: string[];
  skills: string[];
  logo?: string;
  certificate?: string;
  mapLink?: string;
}

export const experiences: ExperienceItem[] = [
  {
    role: "Frontend Web Developer Intern",
    organization: "Revnix",
    location: "Haripur, Pakistan",
    duration: "November 2025 – Present",
    year: "2025",

    logo: "/revnix-logo.png",

    mapLink:
      "https://www.google.com/maps/place/Revnix,+fmr.+Revnix+Technologies+(SMC-Pvt)+Ltd./data=!4m2!3m1!1s0x0:0x8bdc03ced0c5665b",

    responsibilities: [
      "Developed and maintained responsive web applications.",
      "Built modern user interfaces using HTML, CSS, JavaScript, React.js, and Next.js.",
      "Worked with MongoDB databases and API integration.",
      "Implemented frontend features according to design requirements.",
      "Fixed bugs and optimized website performance.",
      "Collaborated with designers and developers to deliver high-quality web solutions."
    ],

    skills: [
      "Frontend Development",
      "React.js",
      "Next.js",
      "MongoDB",
      "Git & GitHub",
      "Responsive Web Design"
    ]
  },


  {
    role: "Part-Time Web Design Intern",
    organization: "Ministry of Planning, Development & Special Initiatives",
    location: "Islamabad, Pakistan",
    duration: "06 August 2025 – 17 September 2025",
    year: "2025",

    logo: "/MoP.jpg",

    mapLink:
      "https://www.google.com/maps?ll=33.73357,73.094502&z=17&t=m&hl=en&gl=US&mapclient=embed&cid=10695135815937060502",

    responsibilities: [
      "Worked on website design and frontend development tasks.",
      "Assisted in creating and updating web pages.",
      "Developed responsive layouts for different screen sizes.",
      "Participated in website maintenance and content updates.",
      "Collaborated with team members on digital projects."
    ],

    skills: [
      "Web Design",
      "HTML & CSS",
      "Bootstrap",
      "Responsive Design",
      "Team Collaboration"
    ]
  },


  {
    role: "Office Administration Intern",
    organization: "Competition Commission of Pakistan",
    location: "Islamabad, Pakistan",
    duration: "25 August 2025 – 24 September 2025",
    year: "2025",

    logo: "/ccp.png",

    mapLink:
      "https://www.google.com/maps/place/Competition+Commission+of+Pakistan/data=!4m2!3m1!1s0x0:0xaf2d042c0a97579c?sa=X&ved=1t:2428&ictx=111",

    responsibilities: [
      "Assisted with daily office and administrative operations.",
      "Supported documentation and record management.",
      "Learned professional office procedures and workflows.",
      "Participated in workplace coordination and communication.",
      "Assisted with organizational tasks."
    ],

    skills: [
      "Office Administration",
      "Professional Communication",
      "Documentation & Record Keeping",
      "Organizational Skills",
      "Workplace Ethics",
      "Teamwork"
    ],

    certificate:
      "https://drive.google.com/file/d/1WldSEOC3mq3J-9YFDxs77MpFQj1iMXBT/view"
  },


  {
    role: "Web Design Intern",
    organization: "RankingGrow",
    location: "Haripur, Pakistan",
    duration: "15 July 2024 – 15 September 2024",
    year: "2024",

    logo: "/RankingGrow-logo-4.png",

    mapLink:
      "https://www.google.com/search?q=ranking+grow+haripur+location",

    responsibilities: [
      "Designed and developed responsive website layouts.",
      "Assisted in frontend development and website customization.",
      "Worked on UI improvements.",
      "Optimized webpages for better user experience.",
      "Collaborated on web design projects."
    ],

    skills: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Responsive Web Design",
      "UI Development"
    ],

    certificate:
      "https://drive.google.com/file/d/1NMjHc-WO-ETxJJd9OjM19NiWUq6Ase4Y/view"
  }
];