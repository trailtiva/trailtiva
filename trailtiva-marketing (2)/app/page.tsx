"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
            alt="Luxury yacht adventure lifestyle"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-[#00A19B] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🔥 PRESALE LIVE - Limited Time Only
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Turn Your Adventure Dreams Into
            <span className="text-[#00A19B]"> Profitable Reality</span>
          </h1>
          <h2 className="mt-4 text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Join 10,000+ smart investors who are already building wealth through the $2.3 trillion adventure economy.
            <strong className="text-[#00A19B]"> Get in before the masses discover this opportunity.</strong>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button
              size="lg"
              className="bg-[#00A19B] hover:bg-[#00A19B]/90 text-white text-lg px-8 py-4 shadow-2xl"
              asChild
            >
              <Link href="/purchase">🚀 Secure Your TVTA Tokens Now</Link>
            </Button>

            <Button
              className="ml-0 sm:ml-4 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg px-8 py-4"
              asChild
            >
              <a href="/Trailtiva-Whitepaper.pdf">📄 White Paper</a>
            </Button>

            <Button
              className="ml-0 sm:ml-4 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg px-8 py-4"
              asChild
            >
              <Link href="/login">👤 Member Login</Link>
            </Button>
          </div>

          <div className="text-white/80 text-lg md:text-xl font-medium mt-6">
            ⚡ Early investor pricing available now
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-[#1E4038] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-[#00A19B]">$847M</div>
              <div className="text-sm opacity-80">Adventure Market Cap</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00A19B]">10,247</div>
              <div className="text-sm opacity-80">Early Investors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00A19B]">156%</div>
              <div className="text-sm opacity-80">Avg. ROI Projection</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00A19B]">$0.30</div>
              <div className="text-sm opacity-80">Current Token Price</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Changes Everything */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E4038]">
              Why Smart Money Is Moving Into Adventure Assets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While others chase overvalued stocks and crypto, you can get in early on the next trillion-dollar market
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-xl">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                  alt="Luxury yacht adventure investment opportunity"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#00A19B] text-white px-3 py-1 rounded-full text-sm font-medium">
                  💰 For Investors
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-4 text-[#1E4038]">Buy Low, Sell High, Live Well</h3>
                <p className="text-gray-600 mb-4">
                  Purchase adventure slots at 30% below market value. Flip them for instant profit or use them for your
                  own luxury adventures.
                </p>
                <div className="text-[#00A19B] font-semibold">Potential ROI: 156%+ annually</div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-xl">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                  alt="Business owner counting money"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#00A19B] text-white px-3 py-1 rounded-full text-sm font-medium">
                  🏢 For Vendors
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-4 text-[#1E4038]">Instant Cash Flow Revolution</h3>
                <p className="text-gray-600 mb-4">
                  Get paid 33% upfront for future bookings. No more waiting for customers. No more cash flow problems.
                </p>
                <div className="text-[#00A19B] font-semibold">Average: $50K instant funding</div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-xl">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                  alt="Friends enjoying luxury adventure"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#00A19B] text-white px-3 py-1 rounded-full text-sm font-medium">
                  🌟 For Adventurers
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-4 text-[#1E4038]">Live More, Pay Less</h3>
                <p className="text-gray-600 mb-4">
                  Skip expensive booking platforms. Access premium adventures at wholesale prices. Live the lifestyle
                  you deserve.
                </p>
                <div className="text-[#00A19B] font-semibold">Save 40% on every adventure</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* TVTA Investment Opportunity */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1E4038] to-[#00A19B] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The TVTA Investment Opportunity</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Limited supply. Unlimited potential. Get in before institutional investors discover this market.
            </p>
          </div>

          <Card className="p-8 relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="relative z-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">💎 Token Economics</h3>
                  <ul className="space-y-4 text-white/90">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#00A19B] rounded-full mr-3"></span>
                      <strong>Hard cap:</strong> 200M TVTA (No inflation, ever)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#00A19B] rounded-full mr-3"></span>
                      <strong>Current price:</strong> $0.30 (Early investor rate)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#00A19B] rounded-full mr-3"></span>
                      <strong>Price increases:</strong> +$0.05 every 10M tokens sold
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">🚀 Immediate Benefits</h3>
                  <ul className="space-y-4 text-white/90">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#00A19B] rounded-full mr-3"></span>
                      Instant access to wholesale adventure marketplace
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#00A19B] rounded-full mr-3"></span>
                      5% referral rewards on every transaction
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#00A19B] rounded-full mr-3"></span>
                      Exclusive early investor privileges
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Launch Announcement */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block bg-[#00A19B] text-white px-6 py-3 rounded-full text-lg font-bold mb-6">
              🎯 MARK YOUR CALENDAR
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#1E4038]">Platform Launches January 2026</h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            When we go live, early investors will have exclusive access to the most profitable adventure deals.
            <strong className="text-[#00A19B]"> Don't wait until everyone else discovers this opportunity.</strong>
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A19B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Early Access</h3>
              <p className="text-gray-600">First pick of premium adventures</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A19B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Maximum Profits</h3>
              <p className="text-gray-600">Best deals before public launch</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A19B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="font-bold text-lg mb-2">VIP Status</h3>
              <p className="text-gray-600">Lifetime premium benefits</p>
            </div>
          </div>

          <Button size="lg" className="bg-[#00A19B] hover:bg-[#00A19B]/90 text-white text-xl px-12 py-6" asChild>
            <Link href="/purchase">🔥 Join The Revolution Now</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1E4038]">Smart Investor Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>How realistic is the 156% ROI projection?</AccordionTrigger>
              <AccordionContent>
                Our projections are based on current adventure market inefficiencies and early investor advantages. With
                30% wholesale discounts and growing demand, conservative estimates show 100-200% annual returns for
                active traders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>What makes TVTA different from other crypto investments?</AccordionTrigger>
              <AccordionContent>
                Unlike speculative tokens, TVTA is backed by real-world adventure assets. Every token represents actual
                adventure capacity with immediate utility and intrinsic value.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>When can I start making money with my tokens?</AccordionTrigger>
              <AccordionContent>
                Immediately! You can trade tokens with other early investors right now. Full marketplace launches
                January 2026, but early trading and referral rewards start day one.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Is there a minimum investment amount?</AccordionTrigger>
              <AccordionContent>
                Minimum purchase is $100 (333 TVTA tokens at current price). Most serious investors start with
                $1,000-$10,000 to maximize their position before price increases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>What's the risk level of this investment?</AccordionTrigger>
              <AccordionContent>
                Like any investment, there are risks. However, TVTA is backed by real adventure assets and growing
                market demand. Our conservative projections and early investor advantages significantly reduce downside
                risk.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"
            alt="Luxury sunset lifestyle"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to change your financial future?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of smart investors who are already building wealth in the adventure economy
          </p>
          <div className="flex justify-center items-center gap-8 mb-8">
            <a href="#" className="text-white hover:text-[#00A19B] transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#00A19B] transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#00A19B] transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#00A19B] transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <div className="text-white/60 text-sm">© 2024 Trailtiva. Building the future of adventure investing.</div>
        </div>
      </footer>
    </div>
  )
}
