import { Navbar } from '../components/Navbar';

function LegalLayout({ title, lastUpdated, children }: { title: string, lastUpdated: string, children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-white/10 pb-12">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">{title}</h1>
            <p className="text-gray-500 font-bold text-sm">LAST UPDATED: {lastUpdated}</p>
          </div>
          <div className="prose prose-invert prose-silver max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-400 prose-p:font-medium prose-p:leading-relaxed">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="APRIL 15, 2026">
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">1. Introduction</h2>
          <p>CreatorHub respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">2. Data Collection</h2>
          <p>We collect information such as your name, email address, and project metadata to provide the sentient AI workspace experience. All data is encrypted at rest and in transit.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">3. AI Training</h2>
          <p>Your private project data is NEVER used to train our global AI models without your explicit, revocable consent.</p>
        </div>
      </section>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="APRIL 15, 2026">
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">1. Acceptance of Terms</h2>
          <p>By accessing or using the CreatorHub platform, you agree to be bound by these terms. If you do not agree to all of the terms and conditions, you may not access the service.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">2. Account Responsibility</h2>
          <p>You are responsible for maintaining the security of your account and for all activities that occur under the account.</p>
        </div>
      </section>
    </LegalLayout>
  );
}

export function Security() {
  return (
    <LegalLayout title="Security Overview" lastUpdated="APRIL 15, 2026">
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">1. Infrastructure</h2>
          <p>Our infrastructure is hosted on secure, industry-leading cloud providers with ISO 27001, SOC 1/2/3, and PCI DSS compliance.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 italic">2. Encryption</h2>
          <p>We use TLS 1.3 for data in transit and AES-256 for data at rest. Zero-knowledge protocols ensure only you can access your ideas.</p>
        </div>
      </section>
    </LegalLayout>
  );
}
