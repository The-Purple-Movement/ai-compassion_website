'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import hiroshi from "@/../public/hiroshi.webp";
import gary from "@/../public/gary.webp";
import kunal from "@/../public/kunal.webp";
import aaker from "@/../public/aaker.webp";
import jenna from "@/../public/jenna.webp";
import stephin from "@/../public/stephin.webp";
import alex from "@/../public/alex.webp";
import nell from "@/../public/nell.webp";
import sandra from "@/../public/sandra.webp";
import olaf from "@/../public/olaf1.webp";
import schwartz from "@/../public/schwartz.webp";
import tim from "@/../public/tim.webp";
import sadhviji from "@/../public/sadhviji.png";
import olivera from "@/../public/olivera.webp";
import douglas from "@/../public/douglas.webp";
import ben from "@/../public/ben.webp";
import ian from "@/../public/ian.webp";
import narumi from "@/../public/narumi.webp";
import ochiai from "@/../public/ochiai.webp";
import manos from "@/../public/manos.webp";
import tono from "@/../public/tono.webp";
import inam from "@/../public/inam.webp";
import edi from "@/../public/edi.webp";
import toshie from "@/../public/toshie.webp";
// import bohacek from "@/../public/bohacek.webp";
import matsumoto from "@/../public/matsumoto.webp";
import murakami from "@/../public/mukarami.png";
import saionji from "@/../public/saionji.webp";
import tahara from "@/../public/tahara.webp";
import alexis from "@/../public/alexis.png";
import prakash from "@/../public/prakash.png";
import anupam from "@/../public/anupam.png";
import dev from "@/../public/dev.png";
import saurabh from "@/../public/saurabh.png";
import valeria from "@/../public/valeria.webp";
import flores from "@/../public/flores.webp";
import pico from "@/../public/pico.png";
import krohn from "@/../public/krohn.png";
import breen from "@/../public/breen.png";
import anas from "@/../public/anas.png";
import ahmed from "@/../public/ahmed.png";
import waleed from "@/../public/waleed.png";
import elyas from "@/../public/elyas.png";
import chada from "@/../public/chada.png";
import sara from "@/../public/sara.png";
import aliaa from "@/../public/aliaa.png";
import haythem from "@/../public/haythem.png";
import osman from "@/../public/osman.png";
import habibi from "@/../public/habibi.png";
import dafa from "@/../public/dafa.png";
import krishna from "@/../public/krishna.png";
import fady from "@/../public/fady.png";
import manal from "@/../public/manal.png";
import sofia from "@/../public/sofia.png";
import ani from "@/../public/ani.png";
import butler from "@/../public/butler.png";
import nichol from "@/../public/nichol.png";
import dekai from "@/../public/dekai.png";
import part from "@/../public/patrick.png";
import jean from "@/../public/jean.png";
import gali from "@/../public/gali.png";
import edith from "@/../public/edith.png";
const speakers = [
  {
    slug: "hiroshi-ishiguro",
    name: "Hiroshi Ishiguro",
    title: "Hiroshi Ishiguro is Professor of Department of Systems Innovation at Osaka University and Visiting Director at Advanced Telecommunications Research Institute, specializing in interactive robotics, avatar, and android science. Creator of Geminoid, an avatar android copy of himself, Ishiguro serves as CEO of AVITA Inc., Project Manager of MOONSHOT R&D, and Thematic Project Producer of EXPO 2025 Osaka. His groundbreaking work has earned prestigious awards including the Sheikh Mohammed Bin Rashid Al Maktoum Knowledge Award.",
    img: hiroshi
  },
  { 
    slug: "gary-a-bolles",
    name: "Gary A. Bolles",
    title: "Gary A. Bolles is co-founder of SoCap Global and partner at Charrette LLC, specializing in impact, innovation, and capital strategies. A leading expert on the future of work, he authored The Next Rules of Work and created LinkedIn courses with 1.7 million learners. As Global Fellow for Transformation at Singularity University, he guides organizations on leveraging AI and exponential technologies. Previously led major technology companies and directed six technology magazines including Yahoo! Internet Life.",
    img: gary
  },
  { 
    slug: "kunal-sood",
    name: "Kunal Sood",
    title: "Kunal Sood is founder of Audacity AI, We The Planet, and X Impact Group, serving as Chief Impact Officer at the Chopra Foundation and Director of Social Impact at Stanford University's CCARE. A TED Resident and Tribeca Fellow, he holds an MBA from Kellogg, masters from UCSF and UPenn in positive psychology, and is completing his doctorate at ISB focused on developing the theory of audacity.",
    img: kunal
  },
  { 
    slug: "jennifer-aaker",
    name: "Dr. Jennifer Aaker",
    title: "Dr. Jennifer Aaker is General Atlantic Professor at Stanford Graduate School of Business and a renowned behavioral scientist specializing in purpose, meaning, and technology's impact on well-being. Winner of the Distinguished Scientific Achievement Award and MBA Professor of the Year, her bestselling books including Humor, Seriously have been translated into 20+ languages. She serves on boards of the Obama Presidential Foundation and other organizations, helping leaders foster purpose and connection in business.",
    img: aaker
  },
  { 
    slug: "sister-jenna",
    name: "Sister Dr. Jenna",
    title: "Sister Dr. Jenna is a spiritual mentor, author, and TV personality who hosts The Next Normal on YouTube and founded the Brahma Kumaris Meditation Museum in Maryland. Recipient of the Presidential Lifetime Achievement Award for National Community Service, she presented the Illuminating the Light Within fashion show for Paris 2024 Olympics. Author of Meditation: Intimate Experiences with the Divine and The Sister Gita Effect, she has appeared on major media outlets and speaks internationally on spiritual leadership.",
    img: jenna
  },
  { 
    slug: "stephen-ibaraki",
    name: "Stephen Ibaraki",
    title: "Stephen Ibaraki is one of the world’s leading futurists and investors, working with more than 1 million CEOs, investors, and scientists to advance AI, quantum computing, and sustainable investments. As the driving force behind AI for Good at the UN ITU, his leadership impacts industries, governments, and startups globally. Microsoft AI Awards since 2018 and a grand judge at top global innovation competitions, Stephen’s expertise is shaping the future of technology - driven economic growth.",
    img: stephin
  },
  { 
    slug: "alex-cahana",
    name: "Dr. Alex Cahana",
    title: "Dr. Alex Cahana specializes in Web 3.0 transformation in emerging markets and developing economies. Founding partner at ImpactRooms and Blockchain Healthcare Expert for UN/CEFACT, he serves on boards of AdanianLabs Africa and ACHA. With 25+ years clinical medical experience including Department of Defense, he was former Professor and Chief of Pain Medicine at University of Washington. A decorated Israeli Defense Forces Officer, he has published 100+ articles and received the University of Washington President's medal for remarkable leadership, social impact and public service.",
    img: alex
  },
   { 
    slug: "sadhvi-bhagawati-saraswati",
    name: "Sadhvi Bhagawati Saraswati",
    title: "Jenna Sadhviji (Sadhvi Bhagawati Saraswati) is a spiritual leader, bestselling author, and social activist based in Rishikesh, India. With a Ph.D. from Stanford, she has lived 25+ years in the Himalayas and is President and Spiritual Head of Parmarth Niketan Ashram. Co-President of Religions for Peace and UN Advisory Council member, she authored the #1 bestseller Hollywood to the Himalayas and received the Lifetime Achievement Award from President Biden. Originally from Los Angeles, dedicated to wisdom teaching and humanitarian service.",
    img: sadhviji
  },
  { 
    slug: "sandra-bond-chapman",
    name: "Dr. Sandra Bond Chapman",
    title: "Dr. Sandra Bond Chapman is Chief Director of Center for BrainHealth at UT Dallas and Dee Wyly Distinguished University Professor. Co-creator of The BrainHealth Project involving 32 leading experts, she has secured 50+ research grants and published 250+ peer-reviewed studies. Chapman leads development of the first BrainHealth Index and directs clinical trials focused on enhancing cognitive capacity across the lifespan, working to democratize brain health strategies globally, transforming how we approach brain health.",
    img: sandra
  },
  { 
    slug: "olaf-witkowski",
    name: "Dr. Olaf Witkowski",
    title: "Dr. Olaf Witkowski is a pioneering leader exploring artificial minds and compassionate AI technology. Founding Director of Cross Labs AI research institute in Kyoto and President of the International Society for Artificial Life, he serves as Board Director at Cross Compass AI. With a PhD from University of Tokyo and Princeton Institute alumnus, Witkowski has co-founded research ventures across three continents including YHouse Inc. in New York and centers in Kathmandu and Kyoto, focusing on diverse intelligences and consciousness.",
    img: olaf
  },
  { 
    slug: "theodore-schwartz",
    name: "Dr. Theodore H. Schwartz",
    title: "Dr. Theodore H. Schwartz is a neurosurgeon/neuroscientist and former David and Ursel Barnes Endowed Professor at Weill Cornell Medicine for 25 years. He has published 500+ scientific articles and lectures worldwide on minimally invasive surgical techniques he helped develop. Author of Gray Matters: A Biography of Brain Surgery, selected by The Economist as a best book of 2024, Dr. Schwartz is a Harvard alumnus whose writing appears globally and currently serves as CEO of medtech company Illumination Diagnostics.",
    img: schwartz
  },
  { 
    slug: "tim-moriarty",
    name: "Tim Moriarty",
    title: "Tim Moriarty is an accomplished Australian artist and digital creator specializing in aerial drone art and indigenous-inspired designs. Of Yanyuwa Aboriginal heritage from Borroloola, Northern Territory, his skin name is Bundiyan (Cheeky Brown Snake). A licensed and certified pilot creating public installations, with extensive creative strategy experience for major companies including Google, YouTube, National Museum of Australia, and Tourism Australia, his latest project is a multi-million-dollar stainless steel optically illusive emu dreaming installation for Badgerys Creek airport.",
    img: tim
  },
  { 
    slug: "nell-watson",
    name: "Eleanor 'Nell' Watson",
    title: "Eleanor 'Nell' Watson, a pioneering researcher in the ethics and safety of machine intelligence, has been a driving force behind some of the most innovative AI ethics standardization and certification initiatives from organizations such as the IEEE. Serves as IEEE Ethics Maestro and chairs the Transparency Experts Focus Group. Former Executive Consultant for Apple and recognized as an Icon by the Royal Academy of Engineering for innovation. Author of Taming the Machine and columnist for Fast Company and Big Think, Watson has spoken at the UN General Assembly and World Bank.",
    img: nell
  },
  { 
    slug: "olivera-tomic",
    name: "Olivera Tomic",
    title: "Olivera Tomic is founder of 8people Intelligence and a visionary AI transformation leader helping enterprises integrate artificial intelligence with clarity and impact. A certified AI Agent Specialist with over a decade of international experience across Australia, Asia, Europe, and Africa, she guides organizations through AI adoption complexities across telecommunications, automotive, insurance, e-commerce, and retail sectors. Her strategic approach focuses on AI consulting, solutions, and upskilling to deliver measurable business outcomes.",
    img: olivera
  },
  { 
    slug: "douglas-thomas",
    name: "Douglas Thomas",
    title: "Douglas Thomas is Professor at USC Iovine and Young Academy and USC Annenberg, researching the intersection of technology and culture. He founded Games & Culture, the first academic journal studying video game culture, and collaborated with John Seely Brown to develop gamer disposition, named a Harvard Business Review Breakthrough Ideas. Their book A New Culture of Learning is read worldwide. Thomas has consulted with governments on educational reform and is currently working on Bodies of Code.",
    img: douglas
  },
  { 
    slug: "ben-waber",
    name: "Ben Waber",
    title: "Ben Waber is a visiting scientist at MIT Media Lab and senior visiting researcher at Ritsumeikan University, recognized as a leading thinker at the intersection of management, data, workplace, and people. Former president and CEO of Humanyze, a workplace analytics company he co-founded, and senior researcher at Harvard Business School. His international bestseller People Analytics was published in 2013, and he regularly speaks at major institutions including the UN and World Economic Forum.",
    img: ben
  },
  { 
    slug: "ian-haycroft",
    name: "Ian Haycroft",
    title: "Ian Haycroft is an Australian entrepreneur and mentor who spent 20 years in international relief work before returning to Australia in 1999 to establish a kinesiology practice. Co-founder of a successful crowdfunding venture capital business, he combines business mentoring with individual coaching. Currently focused on writing and connecting global communities committed to conscious renewal, Haycroft is passionate about finding wisdom paths to assist positive change for humanity and the planet.",
    img: ian
  },
  { 
    slug: "narumi-yoshikawa",
    name: "Dr. Narumi Yoshikawa",
    title: "Dr. Narumi Yoshikawa holds a Ph.D. in agricultural economics specializing in agri-anthropology. She heads the Uehiro Research Center for Japan Environment Studies and serves as a specially appointed professor at RIHN, Professor at Prefectural University of Hiroshima, and Visiting Professor at Waseda University. Her research focuses on environmental studies from a cultural perspective, emphasizing social implementation through Community Supported Agriculture projects that became the foundation of Japan's organic farming movement. She designed environmental education programs connecting universities across 10 Asian countries.",
    img: narumi
  },
  { 
    slug: "yoichi-ochiai",
    name: "Yoichi Ochiai",
    title: "Yoichi Ochiai is a Japanese media artist, entrepreneur, and academic with a doctorate from the University of Tokyo. He serves as Associate Professor at University of Tsukuba Library; Information and Media Associate Professor and Director of the Centre for Digital Nature Development and Research. Ochiai also serves as a specially-appointed professor at Digital Hollywood University and visiting professor at Osaka University of Arts, Kyoto City University of Arts, and Kanazawa College of Art while pioneering innovative digital media art and technology, leading digital nature research and media innovation.",
    img: ochiai
  },
  { 
    slug: "matthew-manos",
    name: "Matthew Manos",
    title: "Matthew Manos is founder of verynice, a design-strategy consultancy that gives half its work away to nonprofits, serving clients including Apple, Google, UNICEF, and NASA. As Associate Dean at the Academy, he leads programs challenging students to design solutions for complex social issues. A global lecturer and author on design and social innovation, Manos created Apple Education training across 36 countries, co-designed the Iovine Young curriculum and was named by Huffington Post one of seven millennials changing the world.",
    img: manos
  },
  { 
    slug: "tamami-tono",
    name: "Tamami Tono",
    title: "Tamami Tono is an award-winning composer and graduate of Kunitachi College of Music and Keio University. Former resident composer of Yo-Yo Ma's Silk Road Ensemble and CCMIX, she has been a member of Reigakusha Gagaku Ensemble since 1990, performing traditional Gagaku and contemporary music. Winner of National Theater Composition Prize and ISCM awards, Tono creates multimedia Breathing Media performances combining traditional Gagaku with modern electronics, and has performed at Tanglewood and Lincoln Center festivals.",
    img: tono
  },
  { 
    slug: "ahmer-inam",
    name: "Ahmer Inam",
    title: "Ahmer Inam is a visionary AI and data leader with over two decades of experience at the forefront of artificial intelligence evolution. A member of XPRIZE Brain Trust, he has pioneered high-impact AI solutions across diverse industries including financial services, healthcare, high-tech, consumer, and retail. From early symbolic AI work in the late '90s to today's cutting-edge neuro-symbolic AI, Inam consistently develops transformative AI applications across multiple sectors, driving breakthrough AI initiatives and leading digital transformation across global markets.",
    img: inam
  },
  { 
    slug: "edi-pyrek",
    name: "Edi Pyrek",
    title: "Edi Pyrek is co-founder of GAIA Foundation (Global Artificial Intelligence Alliance), focusing on decentralized, compassion-based AI. In March 2023, his foundation received a Davos award for technologies that can change millions of lives. A peace negotiator between Afghan tribal leaders after 9/11, Pyrek has advised three Polish prime ministers and trained Forbes-listed individuals. Author of 10 books including for National Geographic, he's a five-time TEDx speaker and creator of Brand Religion methodology and Academy of Future co-founder.",
    img: edi
  },
  { 
    slug: "toshie-takahashi",
    name: "Toshie Takahashi",
    title: "Toshie Takahashi is Professor in the School of Culture, Media and Society and Institute for AI and Robotics at Waseda University, Tokyo, and Associate Fellow at Cambridge CFI. She has held visiting appointments at Oxford, Harvard, and Columbia, conducting cross-cultural research on robots' social impact and AI for Good. Her book Towards the age of Digital Wisdom won the Telecommunication social science award. She holds a PhD from LSE and advises Japan's Ministry of Internal Affairs and Communications, leading youth AI projects for human happiness.",
    img: toshie
  },
  // { 
  //   slug: "matyas-bohacek",
  //   name: "Matyas 'Maty' Bohacek",
  //   title: "Matyas 'Maty' Bohacek is a Stanford University student researching AI model poisoning and training data attribution with Professor Hany Farid. He developed deepfake detectors including one with President Zelenskyy and created an Anderson Cooper deepfake that opened CNN's primetime news show. He also developed state-of-the-art sign language recognition systems now used in college courses. A two-time Apple WWDC Scholar and Czech Innovator of the Year, his research appears in Science and PNAS with opinion pieces in WIRED and Forbes.",
  //   img: bohacek
  // },
  { 
    slug: "shoukei-matsumoto",
    name: "Shoukei Matsumoto",
    title: "Shoukei Matsumoto is a Pure Land Buddhist monk, AI ethics pioneer and futurist exploring how Buddhist philosophy informs ethical AI development. Currently Visiting Professor at University of Bonn for AI in the Human Context, his research focuses on AI, Buddhism, and Transperspectivity. CEO of Interbeing Inc. and international speaker on Human Literacy in the Age of AI, he advocates for Middle Path leadership and coexistence between human and machine intelligence. He is the author of bestselling books translated into 20+ languages.",
    img: matsumoto
  },
  { 
    slug: "taikyo-murakami",
    name: "Taikyo Murakami",
    title: "Taikyo Murakami is the acharya of Shingon Esoteric Buddhism and chief priest of Kogenji Temple, specializing in esoteric Buddhism and Heian-Kamakura period culture. With a master's degree from Otani Graduate School in Buddhist culture, he has conducted over 10,000 face-to-face consultations and serves as dean of Faculty of Education at Gokurakuji Temple. A clinical Buddhist chaplain involved in palliative care and secretary of WCRP Japan Youth Group, he has completed the extreme Shou Hassenmai Goma training.",
    img: murakami
  },
  { 
    slug: "hiroo-saionji",
    name: "Hiroo Saionji",
    title: "Hiroo Saionji serves as Chairman of the Goi Peace Foundation, holding Special Consultative Status with UN Economic and Social Council and official UNESCO relations. With an MBA from Michigan State University and Economics degree from Gakushuin University, he leads neutral peace initiatives worldwide through strategic partnerships with international organizations, embassies, and NGOs. Recipient of Sacred Shri Dnyaneshwar World Peace Prize (2008) and Luxembourg Peace Prize (2019), he served on Japan National Commission for UNESCO (2008-2017).",
    img: saionji
  },
  { 
    slug: "masato-tahara",
    name: "Masato Tahara",
    title: "Masato Tahara pursued graduate studies in physics, focusing on complex systems, quantum mechanics, and phase transitions to explore principles of life. Through learning facilitation, he discovered deep connections between facilitation principles and physics concepts. With generative AI emergence, he recognized structural similarities between AI's mathematical foundations and quantum mechanics, expanding into Physics × AI × Facilitation. He develops AI applications and digital facilitation methods, working to transcend language, cognitive, diversity, and task barriers for a more diverse and inclusive society.",
    img: tahara
  },
  { 
    slug: "dr-alexis-j-stokes-burks",
    name: "Dr. Alexis J. Stokes-Burks",
    title: "Dr. Alexis J. Stokes-Burks is an accomplished equity and inclusion strategist, keynote speaker, and leadership development facilitator with over 15 years of experience. She is the Founder and Chief Strategist of Stokes Strategy & Consulting, partnering with universities, nonprofit, and corporate organizations to build policies, practices and a culture where everyone can thrive. She previously served as Associate Chief Diversity and Inclusion Officer at Harvard University and Assistant Dean at Harvard School of Engineering.",
    img: alexis
  },
  { 
    slug: "prakash-singh-bisen",
    name: "Prakash Singh Bisen",
    title: "Prof. Prakash Singh Bisen is Director at Madhav Institute of Technology and Science, Gwalior, since March 2007, with over 32 years of academic experience. He previously served as Vice Chancellor of Jiwaji University and Director of Bundelkhand University. Holding a D.Sc. in Plant Biotechnology, Prof. Bisen has advised prestigious bodies including the Ministry of Human Resource Development, Ministry of Environment, UPSC, UGC, and Jawaharlal Nehru University, contributing significantly to India's higher education and scientific policy landscape.",
    img: prakash
  },
  { 
    slug: "anupam-trivedi",
    name: "Anupam Trivedi",
    title: "Anupam Trivedi transitioned from over two decades (1995-2017) in pharmaceutical sales and marketing to entrepreneurship and spiritual exploration. With an M.Pharm and MBA, he specialized in diabetes, cardiovascular care, and ophthalmology across European and Latin American markets. In 2017, he established a chain of pharmacy stores and dhanyabhagya.com, bridging traditional wisdom with modern commerce. He founded dharmsanatan.com (Hindi) and bhavambhavaani.com (English) to promote Sanatana Dharma, integrating ancient Vedic wisdom with contemporary living for holistic wellbeing.",
    img: anupam
  },
  { 
    slug: "devendra-kumar-jain",
    name: "Devendra Kumar Jain",
    title: "Dr. Devendra Kumar Jain is Professor of Accounting and Finance at UPES School of Business in Dehradun, India, with over four decades spanning banking and academia. His banking career began in 1982 with Andhra Bank, progressing to senior positions across multiple countries including FOREX Manager at Crane Bank in Uganda, Head of Operations/Risk/Compliance at International Commercial Bank in The Gambia, and CEO at Exchange & Finance (Fiji) Ltd, providing strategic leadership in currency trading and money transfer operations.",
    img: dev
  },
  { 
    slug: "saurabh-bhatt",
    name: "Saurabh Bhatt",
    title: "Saurabh Bhatt is Founder and CEO of A5E Consulting, a Mumbai-based digital transformation solutions company. A Chartered Accountant with executive education from Columbia Business School and MIT in Digital Transformation, he brings unique expertise blending financial acumen and technology. His distinguished career includes leadership roles at TCS (Global Program Director), Nielsen (Executive Director for 100+ countries), and Reliance (CIO, Petrochemical), driving large-scale business transformation programs. He has been an active angel investor since 2018.",
    img: saurabh
  },
   { 
    slug: "valeria-soler",
    name: "Valeria Soler",
    title: "Valeria Soler connects people, ideas, and resources to spark inclusive futures in technology, ensuring Latin American women and youth have a voice in AI. She leads two international initiatives in Colombia: Women in AI (launching the first South American chapter) and Young AI Leaders Bogotá, a UN-backed hub applying AI to SDG challenges. With experience across government, academia, and deep-tech startups, she bridges policy, design, and innovation as an artist, podcaster, and facilitator.",
    img: valeria
  },
  { 
    slug: "warinkwi-flores",
    name: "WarīNkwī Flores",
    title: "WarīNkwī Flores is a first-generation Kara and Kichwa Nations PhD student, IDX International Indigenous Data Sovereignty and AI Governance scholar, Founder/PI of Kinray Hub, and ancestral land trustee of the Chichupampa Clan, Kutakachi Pueblo. Their work intersects rights, data, technology, nature, and culture within Indigenous biocomplexity systems. Flores designs rights-based research and innovation frameworks for land reunion, Indigenous institutionality, and sovereignty, committed to community resilience and trans-systems worldviews.",
    img: flores
  },
  { 
    slug: "pico-velasquez",
    name: "Pico Velásquez ",
    title: "Pico Velásquez is an Architect and Founder/CEO of VIIRA, pioneering conscious cities by merging AI, data, and design. With a Master's in Computational Design from Harvard and 15+ years experience, she has led projects at BIG (Google HQ), Cirque du Soleil, Hard Rock Casino, and Journey (Saudi Arabia digital twins). Recognized by Forbes, UN, and WEF, Velásquez has spoken at COP28, SXSW, LEAP, and Harvard on Future Cities, AI, and blockchain, advancing conscious technologies for regenerative urban futures.",
    img: pico
  },
  { 
    slug: "christopher-krohn",
    name: "Christopher Krohn",
    title: "Chris Krohn operates at the intersection of technology, innovation, and systems design, developing multi-stakeholder ecosystems and programs for Fortune companies, VCs, startups, and cities. Co-founder of ism and founder of Hermetic (an earth-focused venture and technology group) and BxC (Blockchain x Climate Leadership Network), he spent nearly a decade as Director of IDEO's Climate Portfolio, investing in and accelerating circular economy and climate solutions globally while designing incubators, pilots, and investment funds.",
    img: krohn
  },
  { 
    slug: "justin-breen",
    name: "Justin Breen",
    title: "Justin Breen is Co-Founder/CEO of The Epic F.I.T. Network, named one of the Top 5 Masterminds globally by Business Traveler USA Magazine. Co-Founder of Corvia.AI, an education platform teaching AI song creation, he authored Epic Life with foreword by Dr. Peter Diamandis, reaching #1 on Amazon Kindle and making Wall Street Journal and USA Today bestseller lists. His upcoming book Epic Journey features an introduction from Dr. Deepak Chopra with Gary Sinise documentary narration.Chris Krohn operates at the intersection of technology, innovation, and systems design, developing multi-stakeholder ecosystems and programs for Fortune companies, VCs, startups, and cities. Co-founder of ism and founder of Hermetic (an earth-focused venture and technology group) and BxC (Blockchain x Climate Leadership Network), he spent nearly a decade as Director of IDEO's Climate Portfolio, investing in and accelerating circular economy and climate solutions globally while designing incubators, pilots, and investment funds.",
    img: breen
  },
   { 
    slug: "anas-almarie",
    name: "Anas Almarie",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: anas
  },
  { 
    slug: "ahmed-khbeer",
    name: "Ahmed Khbeer",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: ahmed
  },
  { 
    slug: "waleed-akasha",
    name: "Waleed Akasha",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: waleed
  },
  // { 
  //   slug: "mohamed-elyas",
  //   name: "Mohamed Elyas",
  //   title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
  //   img: elyas
  // },
  { 
    slug: "manel-chada-el-islam-benmahcene",
    name: "Manel Chada El Islam Benmahcene",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: chada
  },
  { 
    slug: "sara-hegazy",
    name: "Sara Hegazy",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: sara
  },
  { 
    slug: "aliaa-mohamed",
    name: "Aliaa Mohamed",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: aliaa
  },
  { 
    slug: "haytham-el-azaizy",
    name: "Haytham El-Azaizy",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: haythem
  },
  { 
    slug: "mohamed-osman",
    name: "Mohamed Osman",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: osman
  },
  { 
    slug: "raed-h-habiss",
    name: "Raed H. Habiss",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: habibi
  },
  { 
    slug: "dr-anour-f-a-dafa-alla",
    name: "Dr. Anour F A Dafa-Alla",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: dafa
  },
  { 
    slug: "krishna-raj",
    name: "Krishna Raj",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: krishna
  },
  { 
    slug: "fady-ismaeel",
    name: "Fady Ismaeel",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: fady
  },
  { 
    slug: "manal-rifki",
    name: "Manal Rifki",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: manal
  },
  { 
    slug: "sofia-couto-da-rocha",
    name: "Sofia Couto da Rocha",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: sofia
  },
  { 
    slug: "ani-chahal-honan",
    name: "Ani Chahal Honan",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: ani
  },
  { 
    slug: "stephen-butler",
    name: "Executive Director, Compassion Institute",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: butler
  },
  { 
    slug: "nichol-bradford",
    name: "Nichol Bradford",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: nichol
  },
  { 
    slug: "de-kai",
    name: "DE KAI",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: dekai
  },
  { 
    slug: "patrick-mccullough",
    name: "Patrick McCullough",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: part
  },
  { 
    slug: "jean-alfonso-decena",
    name: "Jean Alfonso-Decena",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: jean
  },
  { 
    slug: "dr-gali-einav",
    name: "Dr. Gali Einav",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: gali
  },
  { 
    slug: "edith-oller ",
    name: "Edith Öller ",
    title: "Anas Almarie is an award-winning digital growth consultant and engineer with 17 years of experience, leading Social Station Branding & Marketing Agency in Dubai. He serves Fortune 500 companies and local businesses with branding, digital marketing, AI, and social media solutions. As Digital Marketing Institute trainer and LinkedIn Solutions Advisor, he maintains 98% satisfaction feedback. A keynote speaker featured on Dubai Eye, Sky News Arabia, Al Arabiya, and CNBC Arabia, Almarie speaks at events across the MENA region.",
    img: edith
  },
];


export default function SpeakerSection() {
  return (
    <div id="speakers" className="py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-libre font-semibold text-[#0A2144]">
        Speakers
      </h1>
      <p className="px-4 md:px-8 w-full lg:w-1/2 mx-auto font-libre my-6 text-sm md:text-lg text-[#0A2144BF]">
        Our speakers are global voices at the intersection of technology,
        culture, policy, and the environment.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 md:px-8 max-w-6xl mx-auto">
        {speakers.map((speaker, index) => (
  <Link key={index} href={`/speakers/${speaker.slug}`}>
    <div
      className="relative w-full aspect-[3/4] group"
      style={{
        perspective: "1200px",
        minWidth: "160px",
        maxWidth: "240px",
        margin: "0 auto",
      }}
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden shadow-md 
                   transition duration-300 transform 
                   group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#0A214455]"
      >
        <Image
          src={speaker.img}
          alt={speaker.name}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  </Link>
))}

      </div>
      <div className="mt-8">
        <a
          href="/producers"
          className="inline-block px-6 py-3 bg-[#89478D] text-white font-semibold rounded-lg shadow hover:bg-[#6d346e] transition"
        >
          Click to View Producers
        </a>
      </div>
    </div>
  );
}