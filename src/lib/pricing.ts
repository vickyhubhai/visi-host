import * as cheerio from 'cheerio';

export interface ScrapedPlan {
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
  checkoutUrl: string;
  imageUrl: string;
  category: string;
}

// Fallback plans for all categories in case scraping fails or for categories that aren't on the billing site yet
export const FALLBACK_PLANS: Record<string, ScrapedPlan[]> = {
  'discord-bot': [
    {
      name: 'Spark Bot',
      price: '₹10',
      billingCycle: 'monthly',
      features: ['512MB DDR4 RAM', '50% vCPU Core', '2GB NVMe SSD', 'Node.js, Python, Java', 'DDoS Protection', '24/7 Uptime'],
      checkoutUrl: 'https://billing.visihost.in/products/discord-bots/spark-discord-bot/checkout',
      imageUrl: 'https://billing.visihost.in/storage/01KWHCHKGF18X8RTWHBM2JR1WS.png',
      category: 'discord-bot'
    },
    {
      name: 'Blaze Bot',
      price: '₹40',
      billingCycle: 'monthly',
      features: ['1GB DDR4 RAM', '100% vCPU Core', '4GB NVMe SSD', 'Node.js, Python, Java', 'DDoS Protection', '24/7 Uptime'],
      checkoutUrl: 'https://billing.visihost.in/products/discord-bots/blaze-discord-bot/checkout',
      imageUrl: 'https://billing.visihost.in/storage/01KWHCPHBCX88SM83TE9B2ENEK.png',
      category: 'discord-bot'
    },
    {
      name: 'Phantom Bot',
      price: '₹85',
      billingCycle: 'monthly',
      features: ['2GB DDR4 RAM', '200% vCPU Core', '8GB NVMe SSD', 'Node.js, Python, Java', 'DDoS Protection', '24/7 Uptime'],
      checkoutUrl: 'https://billing.visihost.in/products/discord-bots/phantom-discord-bot/checkout',
      imageUrl: 'https://billing.visihost.in/storage/01KWHCSC77G826MWAEKWGRDZA0.png',
      category: 'discord-bot'
    }
  ],
  'minecraft': [
    {
      name: 'Dirt Plan',
      price: '₹120',
      billingCycle: 'monthly',
      features: ['2GB DDR4 RAM', 'Ryzen 9 5950X CPU', '15GB NVMe SSD', 'Unlimited Slots', 'Modpack Installer', 'Multicraft Panel'],
      checkoutUrl: 'https://billing.visihost.in/products/minecraft-java',
      imageUrl: '/storage/01KWFFYF61EC7SNRGTR0G9DXX9.jpeg',
      category: 'minecraft'
    },
    {
      name: 'Iron Plan',
      price: '₹240',
      billingCycle: 'monthly',
      features: ['4GB DDR4 RAM', 'Ryzen 9 5950X CPU', '30GB NVMe SSD', 'Unlimited Slots', 'Modpack Installer', 'Multicraft Panel'],
      checkoutUrl: 'https://billing.visihost.in/products/minecraft-java',
      imageUrl: '/storage/01KWFFYF61EC7SNRGTR0G9DXX9.jpeg',
      category: 'minecraft'
    }
  ],
  'vps': [
    {
      name: 'Developer VPS',
      price: '₹350',
      billingCycle: 'monthly',
      features: ['1 vCPU EPYC Core', '2GB DDR4 RAM', '30GB NVMe SSD', '1TB Bandwidth', '1 Gbps Uplink', 'Root Access', '1 IPv4 Address'],
      checkoutUrl: 'https://billing.visihost.in',
      imageUrl: '',
      category: 'vps'
    },
    {
      name: 'Production VPS',
      price: '₹750',
      billingCycle: 'monthly',
      features: ['2 vCPU EPYC Cores', '4GB DDR4 RAM', '60GB NVMe SSD', '3TB Bandwidth', '1 Gbps Uplink', 'Root Access', '1 IPv4 Address'],
      checkoutUrl: 'https://billing.visihost.in',
      imageUrl: '',
      category: 'vps'
    }
  ],
  'dedicated': [
    {
      name: 'EPYC Dedicated',
      price: '₹7,500',
      billingCycle: 'monthly',
      features: ['16 Cores / 32 Threads', '64GB DDR4 ECC RAM', '1TB NVMe SSD', '30TB Bandwidth', '10 Gbps Uplink', 'IPMI Access', '5 IPv4 Addresses'],
      checkoutUrl: 'https://billing.visihost.in',
      imageUrl: '',
      category: 'dedicated'
    }
  ],
  'web': [
    {
      name: 'Starter Web',
      price: '₹49',
      billingCycle: 'monthly',
      features: ['1 Website', '10GB NVMe Storage', 'Unmetered Bandwidth', 'Free SSL Certificate', 'cPanel Control Panel', '1-Click WordPress'],
      checkoutUrl: 'https://billing.visihost.in',
      imageUrl: '',
      category: 'web'
    }
  ],
  'lavalink': [
    {
      name: 'Lavalink Basic',
      price: '₹30',
      billingCycle: 'monthly',
      features: ['512MB RAM', '100% vCPU Core', 'Shared IP Port', 'Zero Buffering', 'High Quality Audio', '99.99% Uptime SLA'],
      checkoutUrl: 'https://billing.visihost.in/products/lavalink',
      imageUrl: '',
      category: 'lavalink'
    }
  ]
};

// URL endpoints on billing panel to scrape
const CATEGORY_URLS: Record<string, string> = {
  'discord-bot': 'https://billing.visihost.in/products/discord-bots',
  'telegram-bot': 'https://billing.visihost.in/products/telegram-bots',
  'minecraft-java': 'https://billing.visihost.in/products/minecraft-java',
  'minecraft-bedrock': 'https://billing.visihost.in/products/minecraft-bedrock',
  'lavalink': 'https://billing.visihost.in/products/lavalink'
};

export async function fetchLivePricing(categoryKey: string): Promise<ScrapedPlan[]> {
  const targetUrl = CATEGORY_URLS[categoryKey];
  if (!targetUrl) {
    return FALLBACK_PLANS[categoryKey] || [];
  }

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 60 }, // Cache and revalidate every 60 seconds
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch pricing page: ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const plans: ScrapedPlan[] = [];

    // Parse the Paymenter/Livewire page structure
    $('a[href*="/checkout"]').each((_, elem) => {
      const href = $(elem).attr('href') || '';
      const checkoutUrl = href.startsWith('http') ? href : `https://billing.visihost.in${href}`;

      const card = $(elem).find('.product-card');
      if (card.length > 0) {
        const name = card.find('h3').text().trim();
        const priceText = card.find('h4').text().trim();
        const rawDesc = card.find('p').text().trim();
        const imgPath = card.find('img.product-card-image').attr('src') || '';
        const imageUrl = imgPath.startsWith('http') ? imgPath : `https://billing.visihost.in${imgPath}`;

        // Parse price and billing cycle
        // E.g. "₹10.00" or "$1.50"
        const priceMatch = priceText.match(/([^\d]*)([\d,.]+)/);
        const price = priceMatch ? `${priceMatch[1]}${parseFloat(priceMatch[2].replace(/,/g, ''))}` : priceText;

        // Parse features by splitting on bullet points
        const features = rawDesc
          .split('•')
          .map(f => f.trim())
          .filter(f => f.length > 0);

        if (name && price) {
          plans.push({
            name,
            price,
            billingCycle: 'monthly',
            features,
            checkoutUrl,
            imageUrl,
            category: categoryKey
          });
        }
      }
    });

    if (plans.length > 0) {
      return plans;
    }

    console.warn(`No plans scraped from ${targetUrl}, using fallbacks`);
    return FALLBACK_PLANS[categoryKey] || [];
  } catch (error) {
    console.error(`Error scraping pricing for ${categoryKey}:`, error);
    return FALLBACK_PLANS[categoryKey] || [];
  }
}
