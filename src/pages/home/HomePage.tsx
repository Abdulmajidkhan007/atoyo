import { HeroSection } from './sections/HeroSection'
import { FeaturedCategories } from './sections/FeaturedCategories'
import { FeaturedProducts } from './sections/FeaturedProducts'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { StatsSection } from './sections/StatsSection'
import { TestimonialsSection } from './sections/TestimonialsSection'
import { FaqSection } from './sections/FaqSection'
import { NewsletterSection } from './sections/NewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts
        title="Tanlangan mahsulotlar"
        subtitle="Eng yaxshi narx va sifat nisbatidagi mahsulotlar"
        type="featured"
      />
      <WhyChooseUs />
      <FeaturedProducts
        title="Eng ommabop mahsulotlar"
        subtitle="Mijozlar eng ko'p xarid qiladigan mahsulotlar"
        type="bestseller"
      />
      <StatsSection />
      <FeaturedProducts
        title="Yangi kelganlar"
        subtitle="Yangi assortiment bilan tanishing"
        type="new"
      />
      <TestimonialsSection />
      <FaqSection />
      <NewsletterSection />
    </>
  )
}
