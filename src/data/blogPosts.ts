export type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  imageURL: string;
  excerpt: string;
  content: string;
  slug: string;
};

// LocalStorage key for blog posts
const BLOG_POSTS_KEY = "pvk-admin-blog-posts";

function safeReadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

function safeWriteJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

// Default blog posts (fallback)
const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Trophy Design: Creating Memorable Awards",
    category: "Trophy Design",
    date: "2024-01-15",
    author: "PVK Design Team",
    imageURL: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover the intricate process behind crafting elegant trophies that celebrate achievements and create lasting memories.",
    content: `# The Art of Trophy Design: Creating Memorable Awards

Trophy design is an art form that combines aesthetics, craftsmanship, and symbolism. At PVK Enterprises, we believe that every award should tell a story and honor the achievement it represents.

## Understanding the Design Process

The journey of creating a memorable trophy begins with understanding the purpose and significance of the award. Whether it's for a sports competition, corporate recognition, or academic achievement, each trophy must reflect the values and essence of the event.

### Material Selection

We work with a variety of premium materials including:
- **Brass**: Known for its durability and classic appeal
- **Crystal**: Offers elegance and sophistication
- **Acrylic**: Modern and versatile, perfect for contemporary designs
- **Wood**: Adds warmth and traditional charm

### Design Elements

Key considerations in trophy design include:
1. **Proportions**: Ensuring the trophy has balanced dimensions
2. **Engraving**: Precision in text and logo placement
3. **Finishing**: Surface treatments that enhance visual appeal
4. **Base Design**: Creating a stable foundation that complements the overall aesthetic

## The PVK Approach

Our design team collaborates closely with clients to bring their vision to life. We offer both traditional and modern designs, ensuring each trophy is unique and meaningful.

## Conclusion

A well-designed trophy is more than just an award—it's a symbol of achievement that will be cherished for years to come. At PVK Enterprises, we're committed to creating trophies that honor excellence and inspire future success.`,
    slug: "art-of-trophy-design-creating-memorable-awards"
  },
  {
    id: "2",
    title: "Office Stationery Trends: What's New in 2024",
    category: "Office Trends",
    date: "2024-01-22",
    author: "PVK Editorial",
    imageURL: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Explore the latest trends in office stationery, from sustainable materials to innovative designs that enhance productivity.",
    content: `# Office Stationery Trends: What's New in 2024

The world of office stationery is evolving rapidly, with new trends focusing on sustainability, functionality, and aesthetic appeal.

## Sustainable Materials

Eco-friendly stationery is no longer a niche market. Companies are increasingly choosing:
- Recycled paper products
- Biodegradable pens and markers
- Sustainable packaging solutions

## Minimalist Design

Clean, minimalist designs are dominating the market. Simple yet elegant notebooks and planners are preferred by professionals who value both form and function.

## Custom Branding

Personalized stationery with company branding is becoming essential for businesses looking to make a professional impression.

## Technology Integration

Modern stationery now includes tech-friendly features like QR codes, NFC tags, and digital integration capabilities.

## Conclusion

The future of office stationery lies in combining traditional quality with modern innovation and environmental consciousness.`,
    slug: "office-stationery-trends-whats-new-2024"
  },
  {
    id: "3",
    title: "Printing Tips: Getting the Best Quality Results",
    category: "Printing Tips",
    date: "2024-02-05",
    author: "PVK Printing Experts",
    imageURL: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn professional printing techniques and tips to ensure your printed materials look crisp, vibrant, and professional every time.",
    content: `# Printing Tips: Getting the Best Quality Results

Achieving professional-quality prints requires attention to detail and understanding of the printing process. Here are our expert tips.

## Pre-Printing Preparation

### File Setup
- Use high-resolution images (300 DPI minimum)
- Convert text to outlines for custom fonts
- Set up proper bleed areas (3mm minimum)
- Use CMYK color mode for print

### Color Management
- Calibrate your monitor
- Use color profiles appropriate for your printer
- Test print before final production

## Paper Selection

The right paper can make or break your print job:
- **Glossy**: Best for photos and vibrant colors
- **Matte**: Ideal for text-heavy documents
- **Textured**: Adds premium feel to invitations and cards

## Printing Techniques

### Offset Printing
Perfect for large quantities, offering consistent quality and cost-effectiveness.

### Digital Printing
Ideal for short runs and quick turnaround times.

### Specialty Finishes
- Spot UV: Adds shine to specific areas
- Foil Stamping: Creates luxurious metallic effects
- Embossing: Adds texture and depth

## Common Mistakes to Avoid

1. Low-resolution images
2. Incorrect color profiles
3. Insufficient bleed margins
4. Wrong paper selection

## Conclusion

Quality printing is an art that combines technical knowledge with attention to detail. Following these tips will help you achieve professional results every time.`,
    slug: "printing-tips-getting-best-quality-results"
  },
  {
    id: "4",
    title: "Custom Rubber Stamps: A Complete Guide",
    category: "Printing Tips",
    date: "2024-02-12",
    author: "PVK Team",
    imageURL: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    excerpt: "Everything you need to know about custom rubber stamps, from design considerations to maintenance tips.",
    content: `# Custom Rubber Stamps: A Complete Guide

Rubber stamps are essential tools for businesses and individuals alike. This comprehensive guide covers everything you need to know.

## Types of Rubber Stamps

### Self-Inking Stamps
Convenient and mess-free, perfect for high-volume use.

### Traditional Rubber Stamps
Classic design with separate ink pad, offering versatility in color choices.

### Pre-Inked Stamps
Long-lasting ink reservoir, ideal for professional use.

## Design Considerations

- **Text Size**: Ensure readability at the intended size
- **Logo Complexity**: Simple designs work best
- **Border Options**: Add frames for professional appearance
- **Date Options**: Include date fields for time-sensitive documents

## Applications

Rubber stamps are used for:
- Official documents
- Business correspondence
- Certificates and awards
- Packaging and shipping

## Maintenance Tips

- Clean regularly with stamp cleaner
- Store in a cool, dry place
- Replace ink pads when needed
- Use appropriate ink for your surface

## Conclusion

A well-made rubber stamp is an investment in efficiency and professionalism. Choose quality materials and proper design for best results.`,
    slug: "custom-rubber-stamps-complete-guide"
  },
  {
    id: "5",
    title: "Choosing the Right Trophy for Your Event",
    category: "Trophy Design",
    date: "2024-02-20",
    author: "PVK Design Team",
    imageURL: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    excerpt: "A comprehensive guide to selecting the perfect trophy that matches your event's theme, budget, and significance.",
    content: `# Choosing the Right Trophy for Your Event

Selecting the perfect trophy requires careful consideration of several factors. This guide will help you make the right choice.

## Event Type Considerations

### Sports Events
- Durable materials for frequent handling
- Clear, visible engraving
- Appropriate size for display

### Corporate Awards
- Professional and elegant design
- Premium materials
- Customizable branding options

### Academic Achievements
- Traditional and formal appearance
- Clear recognition of achievement
- Appropriate for display in offices or homes

## Budget Planning

Trophy costs vary based on:
- Material selection
- Size and complexity
- Quantity ordered
- Customization level

## Design Elements

Consider these aspects:
- **Shape**: Traditional cup, modern abstract, or custom design
- **Material**: Metal, crystal, acrylic, or wood
- **Engraving**: Text, logos, or decorative elements
- **Base**: Matching or contrasting material

## Ordering Timeline

Plan ahead:
- Standard orders: 7-10 business days
- Custom designs: 10-14 business days
- Rush orders: Available with additional fees

## Conclusion

The right trophy enhances the significance of any achievement. Take time to consider your options and work with experienced designers for best results.`,
    slug: "choosing-right-trophy-for-your-event"
  },
  {
    id: "6",
    title: "Sustainable Printing Practices for Modern Businesses",
    category: "Printing Tips",
    date: "2024-03-01",
    author: "PVK Editorial",
    imageURL: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover how businesses can reduce their environmental impact through sustainable printing practices and eco-friendly materials.",
    content: `# Sustainable Printing Practices for Modern Businesses

Environmental responsibility is increasingly important in business operations. Here's how to implement sustainable printing practices.

## Eco-Friendly Materials

### Recycled Paper
- Reduces deforestation
- Lowers energy consumption
- Maintains quality standards

### Soy-Based Inks
- Biodegradable alternative
- Vibrant color reproduction
- Reduced VOC emissions

### Sustainable Packaging
- Minimal packaging design
- Recyclable materials
- Compostable options

## Energy Efficiency

Modern printing equipment offers:
- Energy-saving modes
- Efficient production processes
- Reduced waste generation

## Waste Reduction

Strategies include:
- Print-on-demand services
- Digital proofing
- Proper inventory management

## Certification Standards

Look for:
- FSC (Forest Stewardship Council) certification
- ISO 14001 environmental management
- Green printing certifications

## Conclusion

Sustainable printing is not just good for the environment—it's also good for business reputation and can reduce costs in the long term.`,
    slug: "sustainable-printing-practices-modern-businesses"
  },
  {
    id: "7",
    title: "The Evolution of Office Stationery: From Paper to Digital",
    category: "Office Trends",
    date: "2024-03-10",
    author: "PVK Editorial",
    imageURL: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Explore how office stationery has evolved to meet the needs of modern workplaces while maintaining its essential role.",
    content: `# The Evolution of Office Stationery: From Paper to Digital

Office stationery has undergone significant changes, adapting to new technologies while maintaining its core purpose.

## Historical Perspective

Traditional stationery served as the foundation of business communication for centuries. From handwritten letters to typed documents, paper products were essential.

## Digital Integration

Modern stationery now includes:
- QR codes linking to digital content
- NFC-enabled products
- Hybrid paper-digital solutions

## The Hybrid Approach

Many businesses now use:
- Digital planning tools with physical notebooks
- Online ordering with custom printed products
- Cloud storage integration

## Future Trends

Emerging trends include:
- Smart notebooks with digital backup
- Augmented reality integration
- Sustainable tech-enabled products

## Conclusion

The future of office stationery lies in combining the best of both worlds: the tactile satisfaction of physical products with the convenience of digital technology.`,
    slug: "evolution-office-stationery-paper-to-digital"
  },
  {
    id: "8",
    title: "Engraving Techniques: Making Your Trophies Stand Out",
    category: "Trophy Design",
    date: "2024-03-18",
    author: "PVK Design Team",
    imageURL: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn about different engraving techniques that can add personalization and elegance to your custom trophies and awards.",
    content: `# Engraving Techniques: Making Your Trophies Stand Out

Engraving is a crucial element in trophy design, adding personalization and professional finishing touches.

## Laser Engraving

### Advantages
- Precise and detailed
- Works on various materials
- Consistent quality
- Fast production

### Best For
- Text and logos
- Complex designs
- Small details

## Traditional Engraving

### Advantages
- Classic appearance
- Deep, tactile finish
- Premium feel

### Best For
- Formal awards
- Traditional designs
- Metal surfaces

## Etching Techniques

Chemical etching offers:
- Subtle, elegant finish
- Large area coverage
- Consistent depth

## Color Options

Engraving can include:
- Natural material color
- Filled colors
- Multi-color designs

## Design Tips

- Keep text readable
- Consider material properties
- Test on samples first
- Plan for size constraints

## Conclusion

The right engraving technique enhances your trophy's appearance and ensures lasting quality. Choose based on your design needs and material selection.`,
    slug: "engraving-techniques-making-trophies-stand-out"
  },
  {
    id: "9",
    title: "Corporate Gifting: Making Lasting Impressions",
    category: "Office Trends",
    date: "2024-03-25",
    author: "PVK Team",
    imageURL: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover how thoughtful corporate gifts, including custom stationery and branded items, can strengthen business relationships.",
    content: `# Corporate Gifting: Making Lasting Impressions

Corporate gifting is an art that requires thoughtfulness, quality, and strategic planning to create meaningful connections.

## Why Corporate Gifting Matters

- Strengthens client relationships
- Shows appreciation to employees
- Builds brand recognition
- Creates memorable experiences

## Popular Gift Categories

### Custom Stationery
- Branded notebooks
- Personalized pens
- Custom planners

### Awards and Recognition
- Employee appreciation trophies
- Achievement awards
- Service recognition items

### Premium Accessories
- Leather goods
- Tech accessories
- Desk accessories

## Best Practices

### Timing
- Holiday seasons
- Milestone celebrations
- After successful projects

### Personalization
- Include recipient's name
- Add company branding
- Choose relevant items

### Quality
- Invest in premium materials
- Ensure professional presentation
- Focus on durability

## Budget Considerations

Plan your corporate gifting budget:
- Set annual allocation
- Prioritize key relationships
- Consider bulk discounts

## Conclusion

Effective corporate gifting requires balancing quality, personalization, and budget. Well-chosen gifts can significantly impact business relationships and brand perception.`,
    slug: "corporate-gifting-making-lasting-impressions"
  },
  {
    id: "10",
    title: "Offset vs Digital Printing: Which is Right for You?",
    category: "Printing Tips",
    date: "2024-04-02",
    author: "PVK Printing Experts",
    imageURL: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    excerpt: "Compare offset and digital printing methods to determine which solution best fits your project requirements and budget.",
    content: `# Offset vs Digital Printing: Which is Right for You?

Understanding the differences between offset and digital printing helps you make informed decisions for your projects.

## Offset Printing

### Advantages
- Cost-effective for large quantities
- Superior color accuracy
- Works with various paper types
- Consistent quality

### Best For
- High-volume projects
- Large format printing
- Specialized paper stocks
- Long print runs

## Digital Printing

### Advantages
- Quick turnaround
- Cost-effective for small runs
- Variable data printing
- No setup costs

### Best For
- Short print runs
- Personalized content
- Quick deadlines
- Prototyping

## Cost Comparison

### Offset Printing
- Higher setup costs
- Lower per-unit cost at volume
- Economical for 500+ copies

### Digital Printing
- No setup costs
- Higher per-unit cost
- Economical for under 500 copies

## Quality Considerations

Both methods offer excellent quality:
- Offset: Slightly superior for large areas
- Digital: Excellent for detailed graphics

## Making the Choice

Consider:
- Quantity needed
- Timeline
- Budget constraints
- Customization requirements

## Conclusion

The right printing method depends on your specific needs. Consult with printing professionals to determine the best solution for your project.`,
    slug: "offset-vs-digital-printing-which-right-for-you"
  },
  {
    id: "11",
    title: "Designing Award Ceremonies: A Complete Planning Guide",
    category: "Trophy Design",
    date: "2024-04-10",
    author: "PVK Design Team",
    imageURL: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    excerpt: "Plan a memorable award ceremony with tips on trophy selection, presentation, and creating an atmosphere of celebration.",
    content: `# Designing Award Ceremonies: A Complete Planning Guide

A well-planned award ceremony creates lasting memories and properly honors achievements. Here's your comprehensive guide.

## Pre-Event Planning

### Trophy Selection
- Order well in advance
- Consider display options
- Plan for engraving time
- Budget appropriately

### Venue Setup
- Display area for trophies
- Presentation stage
- Photography considerations
- Guest seating

## Ceremony Elements

### Presentation Style
- Formal presentation
- Surprise announcements
- Group recognition
- Individual honors

### Visual Impact
- Trophy display tables
- Lighting considerations
- Background design
- Photography setup

## Timeline Planning

### 6-8 Weeks Before
- Finalize trophy designs
- Place orders
- Confirm recipients

### 2-4 Weeks Before
- Receive trophies
- Verify engraving
- Plan presentation order

### Week of Event
- Final preparations
- Rehearsal if needed
- Setup and display

## Creating Atmosphere

- Appropriate music
- Professional presentation
- Clear announcements
- Photography coverage

## Post-Event

- Follow-up communications
- Thank you notes
- Photo distribution
- Feedback collection

## Conclusion

A successful award ceremony requires careful planning and attention to detail. Start early and work with experienced professionals for best results.`,
    slug: "designing-award-ceremonies-complete-planning-guide"
  },
  {
    id: "12",
    title: "Maintaining Your Office Equipment: Printer Care Tips",
    category: "Office Trends",
    date: "2024-04-18",
    author: "PVK Team",
    imageURL: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Essential maintenance tips to keep your office printers running smoothly and extend their lifespan.",
    content: `# Maintaining Your Office Equipment: Printer Care Tips

Proper maintenance extends printer life and ensures consistent quality output. Follow these essential care tips.

## Regular Maintenance

### Daily Tasks
- Clean exterior surfaces
- Check for paper jams
- Verify ink/toner levels
- Test print quality

### Weekly Tasks
- Deep cleaning cycle
- Check for firmware updates
- Inspect paper trays
- Clean print heads

## Supply Management

### Ink and Toner
- Use quality supplies
- Store properly
- Monitor levels
- Replace before empty

### Paper Handling
- Use appropriate paper type
- Store in dry conditions
- Avoid overfilling trays
- Check for damage

## Troubleshooting Common Issues

### Print Quality Problems
- Clean print heads
- Check ink levels
- Verify paper type
- Adjust settings

### Paper Jams
- Follow manufacturer guidelines
- Check for obstructions
- Verify paper loading
- Clean rollers

## Professional Service

Schedule regular professional maintenance:
- Quarterly inspections
- Annual deep cleaning
- Software updates
- Part replacements

## Cost Savings

Proper maintenance:
- Reduces repair costs
- Extends equipment life
- Improves print quality
- Prevents downtime

## Conclusion

Regular maintenance is an investment in your equipment's longevity and performance. Follow manufacturer guidelines and seek professional help when needed.`,
    slug: "maintaining-office-equipment-printer-care-tips"
  }
];

// Get all blog posts (from localStorage or default)
export const getAllBlogPosts = (): BlogPost[] => {
  const stored = safeReadJSON<BlogPost[]>(BLOG_POSTS_KEY, []);
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  return defaultBlogPosts;
};

// Save blog posts to localStorage
export const saveBlogPosts = (posts: BlogPost[]): void => {
  const safe = Array.isArray(posts) ? posts : [];
  safeWriteJSON(BLOG_POSTS_KEY, safe);
};

// Get blog posts (for backward compatibility)
export const blogPosts = getAllBlogPosts();

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  const posts = getAllBlogPosts();
  if (category === "All") return posts;
  return posts.filter(post => post.category === category);
};

export const getRelatedPosts = (currentPostId: string, limit: number = 3): BlogPost[] => {
  const posts = getAllBlogPosts();
  const currentPost = posts.find(p => p.id === currentPostId);
  if (!currentPost) return [];
  
  return posts
    .filter(post => post.id !== currentPostId && post.category === currentPost.category)
    .slice(0, limit);
};

export const getAllCategories = (): string[] => {
  const posts = getAllBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
};

// Generate a slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

