import { Project, Organization, User, Contribution } from './types';

export const INITIAL_ORGANIZATION: Organization = {
  id: 'amazon-watch',
  name: 'Amazon Watch Initiative',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqkZoCajPd_G3y6w2YKp2ZgB2Bz2_VRCd5TlYoLz-I-yntX0zGShKis2yNW6j3OuJnfglW5nleCPQJfu4hfOIlUufkPDKOaUTDGvXchkjjyoQn9GZGRYP4KSZZIMs78tenRgHvEmuWXMbVDT0JHb5iDKGQyAonNeuPV6qhe2B4yjyvsDwf4sGmsR5Q5u2QIx57xsf2-CQAxMPet17M7wq0c2owC5ZLwRKX3xsHsCAJpkFUbDPGqRfHEQ',
  bio: 'Empowering local communities to protect and restore ancient forests through radical transparency, collective action, and native seed banks.',
  mission: 'To restore 100,000 hectares of critical rainforest ecosystems by 2030 while establishing self-sustaining community co-ops.',
  foundedYear: 2018,
  totalImpactRaised: '$4.2M',
  projectsCompleted: 142,
  successRate: 98,
  teamQuote: 'The forest is not just a carbon sink; it is an active ancestral ecosystem. By empowering indigenous communities with digital tracking tools, we ensure every single dollar is audited and accounted for.',
  teamQuoteAuthor: 'Chief Nemonte Quenemo',
  teamQuoteRole: 'Co-Founder & Tribal Ambassador',
  teamImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvrrytExK0ui02ZsX2WtTr-VYIlKodjZCNh-N96ICkaP4551yA6dv5twE5OIq3xSbwHLuvhmEBDH_M1J-fWhJ73gezupfJE_KhEa0KaDgptVsY-AyA8xMUv0TDXCSnJzxGYUViA5yqCB_c0VPnAxqYJMGOLIIZvvGyPU-0KcQ3eSRusv0hG10JKL5-dXsPAMAA5_HL198KV-JA9H0FW1t5Isa4rQAZ4eknWstbUjMTihRVE8YGLGbFUg',
  activeProjectsCount: 3,
  verified: true
};

export const INITIAL_USER: User = {
  id: 'sarah-jenkins',
  email: 'sarah.jenkins@impact.org',
  name: 'Sarah Jenkins',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvrrytExK0ui02ZsX2WtTr-VYIlKodjZCNh-N96ICkaP4551yA6dv5twE5OIq3xSbwHLuvhmEBDH_M1J-fWhJ73gezupfJE_KhEa0KaDgptVsY-AyA8xMUv0TDXCSnJzxGYUViA5yqCB_c0VPnAxqYJMGOLIIZvvGyPU-0KcQ3eSRusv0hG10JKL5-dXsPAMAA5_HL198KV-JA9H0FW1t5Isa4rQAZ4eknWstbUjMTihRVE8YGLGbFUg',
  memberSince: 'Jan 2022',
  verificationLevel: 3,
  recurringDonationsCount: 3,
  totalDonated: 4250.00
};

export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  {
    id: 'tx-001',
    projectId: 'amazon-canopy',
    projectTitle: 'Roots of Resilience: Restoring the Heart of the Amazon',
    projectImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJWMwfY1k7907tdiefTwo_A-flqbp7NeIxoJM4CTF7GIvshTOvEQJfZ4ckxT8_97lVXw0M1KNDE_g1FHTE4yKz6JN6Qfvf1lUjBSB5O3FBGm4IfFX-YcMFbek1ZI1Ab3BBqnEOnExXNbPM_gtyY_jGDzT3em7XGPEmt8jaVvCMpuR9dO0c-JxhkjVfuVH8vA5tlMsbZ7Q8URJydANMlYdwZesoArGqZfgRBpRbQbRqD0f2P1gJrejZg',
    amount: 250.00,
    date: 'July 10, 2026',
    isRecurring: false,
    isAnonymous: false,
    status: 'Completed'
  },
  {
    id: 'tx-002',
    projectId: 'rural-schools-kenya',
    projectTitle: 'Digital Futures for Rural Schools',
    projectImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAosCX_P53CFQoaI3Vda2mZ7iuLUP9mxIU1VIcOlDdHFfA6lqM-eFTjUxxmylvjcgQAu8QyyQwX7emnXdV_pQ-CPYY5qbDNya2rPW6lWTJvmS0z3N3yQls2hZdrguWvMBfdyNQNKjRKSC0zpDpQxtC25zcTiclyB-jDwxZytrFVj7YsgV5uytX_p5MYG5bzoRbOakp9vMlnHMgskHy3I-9h5SstNDrHWy3EqSsOXDpgUQz1IpV2atlJ2w',
    amount: 150.00,
    date: 'June 28, 2026',
    isRecurring: true,
    isAnonymous: false,
    status: 'Completed'
  },
  {
    id: 'tx-003',
    projectId: 'solar-water-grid',
    projectTitle: 'Clean Water Solar Grid Phase 2',
    projectImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKP1JGvIUk8CCj7O7cgEz5s8S42LmpJd9x78OVmrV6ehDZ6A1OjFYWfRQqkE5nOhTWNft1vknrugWwCRTkX-olmtEmyQ0Wn8IQD0qAUlJNGrPSJ6dfDcSTm9NkWPakIXpRAw9h4jT39OJP4R1j0L0lBXObhxFYDp8-qgZP1ybGiXqwu8FrdsE7Sh1pCau1w2_fYc7lpUAs_xMM_blUKxb8LkN3sTwS3YXvqviE4rab4W1sGp0TsWUlmg',
    amount: 75.00,
    date: 'June 15, 2026',
    isRecurring: true,
    isAnonymous: true,
    status: 'Completed'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'amazon-canopy',
    title: 'Roots of Resilience: Restoring the Heart of the Amazon',
    slug: 'restoring-amazon-canopy',
    shortDescription: 'Protecting and restoring critical ancient forest canopies through native seed banks and local indigenous-led co-ops.',
    challenge: 'Over 15% of the Amazon rainforest has been deforested, pushing the ecosystem toward an irreversible tipping point. Deforestation ruins soil nutrition, threatens native wildlife, and displaces local communities. Traditional top-down reforestation projects often fail due to lack of local community involvement and unmonitored sapling survival rates.',
    fullStory: 'Our initiative takes a radical, ground-up approach. We work directly with indigenous Kichwa and Waorani communities in the Madre de Dios region. Together, we are establishing three native seed banks, incubating 50,000 hyper-resilient primary tree saplings, and deploying sensor-tracked smart tagging on newly planted canopies to measure real-time survival rates and environmental carbon offsets. By combining deep ancestral knowledge with transparent, verified modern data, we ensure every sapling has a name, a GPS location, and a dedicated team of caretakers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJWMwfY1k7907tdiefTwo_A-flqbp7NeIxoJM4CTF7GIvshTOvEQJfZ4ckxT8_97lVXw0M1KNDE_g1FHTE4yKz6JN6Qfvf1lUjBSB5O3FBGm4IfFX-YcMFbek1ZI1Ab3BBqnEOnExXNbPM_gtyY_jGDzT3em7XGPEmt8jaVvCMpuR9dO0c-JxhkjVfuVH8vA5tlMsbZ7Q8URJydANMlYdwZesoArGqZfgRBpRbQbRqD0f2P1gJrejZg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSM6TzcIP-ECbKGXHldf7_P2-1DX-PCwaQtkeBrWmiFLLIo9pWfhHf5SeA3NURgMj31L-_HRdS2aPm6hexP5z3W8kiOiNWJx0S_3lqhX_p2L9P-fS01yBADaxMFIYZgXe5CdYse2Bo_gmKzqaeRLiV_ELqXnYAAEwSUHMidu8G4q0xY3eD31G7PivFl0Fs5zJDWCVwTLy5vKF_yROwnIBqzR3lCR-vEio-cCfTiWloMCK0FW0d63dm-w', // Sunrise over canopy
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeEL6F4nM6_UYM1-76yqz-FeNC-vsesWrvPYNDqbFt-OO8PUiawU1c5PLJmjossWP9628MBCpo1icUfXU3_EF_ijSh30CZQQcuy9X_T7bWu0OseobvvctrSoi270_fzyu8pfcFFdM1f9cUBor1ivd9untX-dS5pe7nNn44L3mp_mPVhbicJHFdoapLQiK3schwatzkacWMmo3Mol3I9yxbWQrR2ItdFhVw_mcuWaONjO6oM7HC0JftiA', // Sapling planting
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQKEqoq5tYk0cjAgdiLZVx2AF8QczV3sk0jtl8THqSQ9wMpKRZx24yHv70eSw_smLZUjXYk8LAs780W5ShdYvKdQGdxgcRI2xReQ5F_2TBtQs0XH5DqPQzgf4LF1abYaNslCuwJmgX0a_IlUajlhee7biTx4dejvHDd8fncyJxkKwACLBLKu8cOvgK3BrUK-0KtKsqPuscmt5JZ_ljw2LaIEi1d9EVJjBAxPKEb408oPXa2QXt4z6BqQ'  // Community volunteers
    ],
    category: 'Environment',
    location: 'Madre de Dios, Peru',
    urgency: 'Critical',
    goalAmount: 45000,
    raisedAmount: 38250,
    donorCount: 412,
    daysLeft: 6,
    organizationId: 'amazon-watch',
    organizationName: 'Amazon Watch Initiative',
    organizationAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqkZoCajPd_G3y6w2YKp2ZgB2Bz2_VRCd5TlYoLz-I-yntX0zGShKis2yNW6j3OuJnfglW5nleCPQJfu4hfOIlUufkPDKOaUTDGvXchkjjyoQn9GZGRYP4KSZZIMs78tenRgHvEmuWXMbVDT0JHb5iDKGQyAonNeuPV6qhe2B4yjyvsDwf4sGmsR5Q5u2QIx57xsf2-CQAxMPet17M7wq0c2owC5ZLwRKX3xsHsCAJpkFUbDPGqRfHEQ',
    verified: true,
    transparencyScore: 98,
    dollarDistribution: { admin: 5, field: 85, reserves: 10 },
    updates: [
      {
        id: 'u-1',
        date: 'July 12, 2026',
        title: 'Seed Bank #2 Construction Completed',
        content: 'Thanks to the latest round of donations, our team has officially finished constructing the native seed vaults in the Kichwa territory. These solar-powered facilities will preserve over 120 varieties of primary forest seeds.',
        author: 'Nemonte Quenemo',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqkZoCajPd_G3y6w2YKp2ZgB2Bz2_VRCd5TlYoLz-I-yntX0zGShKis2yNW6j3OuJnfglW5nleCPQJfu4hfOIlUufkPDKOaUTDGvXchkjjyoQn9GZGRYP4KSZZIMs78tenRgHvEmuWXMbVDT0JHb5iDKGQyAonNeuPV6qhe2B4yjyvsDwf4sGmsR5Q5u2QIx57xsf2-CQAxMPet17M7wq0c2owC5ZLwRKX3xsHsCAJpkFUbDPGqRfHEQ',
        tag: 'Milestone Met'
      },
      {
        id: 'u-2',
        date: 'June 28, 2026',
        title: '5,000 Saplings Ready for Monsoon Outplanting',
        content: 'Our community greenhouse team has verified the maturity of the first 5,000 mahogany and Brazil-nut saplings. GPS sensor tags are currently being configured to ensure we can track their growing health.',
        author: 'Carlos Menendez',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg',
        tag: 'Project Progress'
      }
    ],
    comments: [
      {
        id: 'c-1',
        userName: 'Sarah Jenkins',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvrrytExK0ui02ZsX2WtTr-VYIlKodjZCNh-N96ICkaP4551yA6dv5twE5OIq3xSbwHLuvhmEBDH_M1J-fWhJ73gezupfJE_KhEa0KaDgptVsY-AyA8xMUv0TDXCSnJzxGYUViA5yqCB_c0VPnAxqYJMGOLIIZvvGyPU-0KcQ3eSRusv0hG10JKL5-dXsPAMAA5_HL198KV-JA9H0FW1t5Isa4rQAZ4eknWstbUjMTihRVE8YGLGbFUg',
        content: 'Seeing the transparency report and being able to track the exact coordinates of the tree we funded is incredible! Thank you Carlos and tribal elders for your dedicated efforts.',
        date: 'July 11, 2026',
        amountDonated: 250.00,
        likes: 24
      },
      {
        id: 'c-2',
        userName: 'Elena Rostova',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0IfS6Hh4MXHHTlGxv8Kd1YxVqjLv-1K45zkvWH3eS22al0IkgIq-hdn1uomMHdRTwyKHHBv4MV5kYUr0YIDPfZZ_T9bCh2m-TreXV2Kc2mIDnAHIn4atU-LilOl68ZYGl_VrZpIrZAF1Pb9Qy7W_ov6oQtOX5QroTC4FSz3ssWqJxubWXO5ovSD_bgllNYEyN8qANxSTwNkErxuvX4KRVo4LcPejInd2HCim8uVnyYID2GIArGdoXg',
        content: 'This level of radical transparency should be the baseline for all global initiatives. Honored to back this team.',
        date: 'July 05, 2026',
        amountDonated: 100.00,
        likes: 15
      }
    ],
    milestones: [
      {
        id: 'm-1',
        title: 'Seed Bank Construction',
        description: 'Establish local community seed storage vault equipped with off-grid solar temperature controls.',
        status: 'Completed',
        reachedDate: 'July 2026'
      },
      {
        id: 'm-2',
        title: 'Sapling Incubation & Sensor Setup',
        description: 'Cultivate first 20,000 endemic trees and configure solar-powered tracking meshes.',
        status: 'In Progress'
      },
      {
        id: 'm-3',
        title: 'Wider Corridor Connection',
        description: 'Connect fragmented canopy zones with wildlife corridors through extensive forest planting.',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: 'rural-schools-kenya',
    title: 'Digital Futures for Rural Schools',
    slug: 'digital-futures-rural-schools',
    shortDescription: 'Equipping rural classrooms in Eastern Kenya with off-grid solar-powered tablets and low-bandwidth local educational servers.',
    challenge: 'Rural schools in semi-arid parts of Kenya suffer from massive learning material deficits. Textbook-to-student ratios are often 1-to-5, and power outages make digital learning platforms inaccessible.',
    fullStory: 'We build self-contained local intranets powered by a single solar-grid classroom kit. Each kit contains 40 low-power, rugged tablets preloaded with native educational modules and Wikipedia Offline. The server operates locally without requiring expensive, unstable internet connections. Local teachers are fully trained as primary IT administrators, ensuring longevity and long-term sustainability.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAosCX_P53CFQoaI3Vda2mZ7iuLUP9mxIU1VIcOlDdHFfA6lqM-eFTjUxxmylvjcgQAu8QyyQwX7emnXdV_pQ-CPYY5qbDNya2rPW6lWTJvmS0z3N3yQls2hZdrguWvMBfdyNQNKjRKSC0zpDpQxtC25zcTiclyB-jDwxZytrFVj7YsgV5uytX_p5MYG5bzoRbOakp9vMlnHMgskHy3I-9h5SstNDrHWy3EqSsOXDpgUQz1IpV2atlJ2w',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKvTVWBqJBuCjRvljCHw5zkkvy1zrpPoPdkfwK9ZDoiENEIePhDlvd-eTLgSqCdaXvYxjxPJ6DrRq6TOMieQdcyqPc4q9pwinkDsYeu6UMFRzzbfrJ-T7hEznHaPRP9hnjIakQG7JenvLltm3V2QsB7LcfozBNq5hta9mJmtnTwG4GXJfWAjLZOr1Izroz32pQ4TDcUBGoGzusqGUBEtYrsAgEqwH6lEVQxjZJuuKtuhFC9r9cgCbxAQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQpLyG3LfgHIex4wZ-2w3rQSAxytiSf3nrmiuvXbcmhRyXpK5AwZd2dETcuF0gBNYCQ9RMv407nL-yvTiBK5SyTRtfNDvVdsNFYINZLn5DFfaYMUSCl9dSIOA11W72wxRxMqIjVA1jYWXccOMhyf87RXgT5-S6BDPs-VUhX1oEULldC-x7vk7ea_GD3lRoK2K96WeGbJdThMUKffZp4enqHixyZTaRoIIr9rFE3ZzQZDjh4SyZh6wJaQ'
    ],
    category: 'Education',
    location: 'Machakos County, Kenya',
    urgency: 'Trending',
    goalAmount: 25000,
    raisedAmount: 18750,
    donorCount: 228,
    daysLeft: 12,
    organizationId: 'edu-global',
    organizationName: 'EduGlobal Foundations',
    organizationAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWrg47GQF_ZHytBsk6NxD3_XmhA3sp9_hkdQ8NAc-rqlVNTVkGgbqhK-YBEgvaC1owWNnid4gghzc8K6z-Xq1PRkoW-RFCPJCF1WX348PjanEHu3z4aOQsdml05qWwQf9Qa_xdZdu_l_EFlRRIFUpjaKGpcZlENmF0LVp15AMpCYgHbrUA1agBxxUG36FlwMUaYor_2yyiOMIImeb0JQeeJsu43Q5qOtzKNqkIo8q53bOWxltmDoQe6g',
    verified: true,
    transparencyScore: 95,
    dollarDistribution: { admin: 8, field: 82, reserves: 10 },
    updates: [
      {
        id: 'u-3',
        date: 'July 05, 2026',
        title: 'Initial Server Testing Successful',
        content: 'Our dev team has completed local field testing of the offline LMS (Learning Management System). Speeds are running well under local Wi-Fi bridges.',
        author: 'Evelyn Musembi',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG-3FrxXYTOFMXQ31zXhWA2PMF4_t4WFZFseCKrvpC1TimM_zBQRVnHTUS1o3C82Ijj8tmoe-2bpjhh2Q_KELEOYRSUcfLdpToe-DR75imlnZdvZo1iR76zGhmaZu6SNsiCUgisSv1rnX3Wj8gERiWKsLgoG8EF1xG1lt4Y0N_ymXZ8B70iAP5nrId7Ree-IZT26AdIkSfsSTyNlw6Hg5tdk14_MFFChBaFlltqyeiuSuDFRb_u4SgCw',
        tag: 'Technical'
      }
    ],
    comments: [],
    milestones: [
      {
        id: 'm-4',
        title: 'LMS Platform Assembly',
        description: 'Complete preloading and setup of all rugged 10" educational tablets.',
        status: 'Completed',
        reachedDate: 'June 2026'
      },
      {
        id: 'm-5',
        title: 'Classroom Solar Deployment',
        description: 'Install modular 300W photovoltaic panels in Machakos high school.',
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'solar-water-grid',
    title: 'Clean Water Solar Grid Phase 2',
    slug: 'clean-water-solar-grid',
    shortDescription: 'Constructing solar-powered water pumps and mechanical filtration grids to serve 12,000 residents in the drylands of Ethiopia.',
    challenge: 'Water scarcity dictates daily survival in southern rural districts. Families travel up to 6 hours to collect contaminated river water, creating a critical sanitation crisis.',
    fullStory: 'Phase 2 scales our proven solar pump grid model. We dig deep boreholes, tap groundwater reserves, and install clean, high-throughput pumps driven entirely by high-efficiency solar panels. Water is piped to centralized, community-managed kiosks with automated filtration monitors, preventing mechanical failure before it impacts clean water flow.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKP1JGvIUk8CCj7O7cgEz5s8S42LmpJd9x78OVmrV6ehDZ6A1OjFYWfRQqkE5nOhTWNft1vknrugWwCRTkX-olmtEmyQ0Wn8IQD0qAUlJNGrPSJ6dfDcSTm9NkWPakIXpRAw9h4jT39OJP4R1j0L0lBXObhxFYDp8-qgZP1ybGiXqwu8FrdsE7Sh1pCau1w2_fYc7lpUAs_xMM_blUKxb8LkN3sTwS3YXvqviE4rab4W1sGp0TsWUlmg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHLHMIvdZeJIsct1e6Tq9qGVdpLba3B1reHj5I_5jbA4Oni0eKRU08OjMRmhkxX5FiXOkbZxSYwA-pXkfUG8a3HdfNTOX8qKgTTDN4wNKV-mpeYea7gKXvN-8aLApc66KJmqxw9_TnfAU2CzE8uhiUnNKSbayrCQDnKMlSmuZ5ecPuRajZsIpSPXv0fPcRuqmgbbR6dIA-AZoa6ZkzgLkwFTXbkVwrhd9sFWiDIk3fEUive_SNZWNEUQ'
    ],
    category: 'Healthcare',
    location: 'Oromia Region, Ethiopia',
    urgency: 'Near Goal',
    goalAmount: 60000,
    raisedAmount: 58150,
    donorCount: 519,
    daysLeft: 3,
    organizationId: 'water-action',
    organizationName: 'PureWater Action Now',
    organizationAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg',
    verified: true,
    transparencyScore: 99,
    dollarDistribution: { admin: 4, field: 90, reserves: 6 },
    updates: [],
    comments: [],
    milestones: []
  },
  {
    id: 'safe-havens-shelter',
    title: 'Safe Havens: Community Shelter Fund',
    slug: 'safe-havens-shelter-fund',
    shortDescription: 'Constructing robust micro-shelters and establishing mental health therapy clinics for displaced refugees in the borderlands.',
    challenge: 'Instability and rapid climate displacement have left millions without secure, weather-resistant living structures, exposed to extreme temperatures and high health risks.',
    fullStory: 'The Safe Havens initiative establishes dynamic community-led micro-shelter clusters. Each cluster is designed to house 12 displaced families, incorporating rainwater collection, thermal insulation, and dedicated private therapeutic facilities. We integrate peer-led psychological support and vocational clinics directly into the shelter common areas, rebuilding social trust and community bonds from day one.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxGKG9iLtmchTvdZRiKLNgAdVfGifnG-f3nlupOdSOf-Tzd5ySW_RGqjEhiKkO0L08lsL-pBWZ6xDoP5n40oeGkdwbx82BI-lHBF-oRRHjWiRBzdkR8wx6lCG6c4oUPA6F3Erfh4LrhzV-q6CZaC04wu8SsbnrTKrcn-GOY2_C_1bSTX_4IDAl2rNNfX1osLJxq1qIAN4RseWnbQVT_aYxkHeobbhdU-DwkEHlilBqlGhuDGj_LasuBw',
    images: [],
    category: 'Human Rights',
    location: 'Cúcuta Borderland, Colombia',
    urgency: 'Critical',
    goalAmount: 35000,
    raisedAmount: 12200,
    donorCount: 94,
    daysLeft: 18,
    organizationId: 'humanity-shield',
    organizationName: 'Humanity Shield Global',
    organizationAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0IfS6Hh4MXHHTlGxv8Kd1YxVqjLv-1K45zkvWH3eS22al0IkgIq-hdn1uomMHdRTwyKHHBv4MV5kYUr0YIDPfZZ_T9bCh2m-TreXV2Kc2mIDnAHIn4atU-LilOl68ZYGl_VrZpIrZAF1Pb9Qy7W_ov6oQtOX5QroTC4FSz3ssWqJxubWXO5ovSD_bgllNYEyN8qANxSTwNkErxuvX4KRVo4LcPejInd2HCim8uVnyYID2GIArGdoXg',
    verified: true,
    transparencyScore: 97,
    dollarDistribution: { admin: 6, field: 84, reserves: 10 },
    updates: [],
    comments: [],
    milestones: []
  },
  {
    id: 'green-corridor-init',
    title: 'The Green Corridor Initiative',
    slug: 'green-corridor-init',
    shortDescription: 'Reforesting wildlife migration paths and purchasing active conservancy protections for endangered mountain lions and native flora.',
    challenge: 'Human developments are splintering key migratory pathways, leading to animal fatalities, critical inbreeding, and the gradual collapse of regional wild ecosystems.',
    fullStory: 'We are mapping, acquiring, and reforesting key ecological pathways in the high sierra mountains. By placing strategic forest strips and securing land trusts, we build connected habitats allowing mountain lions, wolves, and native birds to cross human areas safely. Local farmers are hired to plant endemic flora, creating green economic incentives.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV6w4cvdAlFOQ2X-ZVn4ijaqkdgu7feROu2pvBRntz9Cy6HTwitvazy8JmnjN3yP3RnjETfeTTHeArsmBU5s09XOvFFKsCApKOgPcJWm38ryeCrcGWboIgvvkEFrde5o-TjF-tBDhbdp8gfTWG0iho-Me5owRA0v8VEXnuclOvx8oijIomliQlodkfziorpqr6WrKYL6MssboVPjOzfr36pAxzdPfqMdS0yo2K1i_a96HptnZ7_TFGVw',
    images: [],
    category: 'Environment',
    location: 'Sierra de Minas, Guatemala',
    urgency: 'Trending',
    goalAmount: 85000,
    raisedAmount: 51200,
    donorCount: 388,
    daysLeft: 24,
    organizationId: 'amazon-watch',
    organizationName: 'Amazon Watch Initiative',
    organizationAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqkZoCajPd_G3y6w2YKp2ZgB2Bz2_VRCd5TlYoLz-I-yntX0zGShKis2yNW6j3OuJnfglW5nleCPQJfu4hfOIlUufkPDKOaUTDGvXchkjjyoQn9GZGRYP4KSZZIMs78tenRgHvEmuWXMbVDT0JHb5iDKGQyAonNeuPV6qhe2B4yjyvsDwf4sGmsR5Q5u2QIx57xsf2-CQAxMPet17M7wq0c2owC5ZLwRKX3xsHsCAJpkFUbDPGqRfHEQ',
    verified: true,
    transparencyScore: 98,
    dollarDistribution: { admin: 5, field: 85, reserves: 10 },
    updates: [],
    comments: [],
    milestones: []
  }
];
