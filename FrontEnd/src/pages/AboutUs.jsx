/* export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          About CrowdFund
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-lg text-gray-700 mb-6">
            CrowdFund is a platform that connects creators with backers to bring
            innovative ideas to life. Whether you're an entrepreneur with a
            groundbreaking product, an artist with a creative vision, or someone
            who wants to support amazing projects, CrowdFund is here to help.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            To democratize funding and make it possible for anyone with a great
            idea to find the support they need to make it happen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>For Creators:</strong> Share your project, set a funding
              goal, and engage with your community of supporters.
            </p>
            <p>
              <strong>For Backers:</strong> Discover amazing projects and
              contribute to the ones that inspire you.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
            Why Choose CrowdFund?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-700">
                Your contributions and campaigns are protected with
                industry-standard security measures.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community Driven
              </h3>
              <p className="text-gray-700">
                Join a vibrant community of creators and supporters who believe
                in making dreams reality.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-700">
                Simple, intuitive interface makes it easy to create campaigns or
                find projects to support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Transparent
              </h3>
              <p className="text-gray-700">
                Track progress, see updates, and stay connected with the
                projects you care about.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 */

import {
  Users,
  Target,
  Shield,
  Heart,
  Lightbulb,
  Award,
  Calendar,
  MapPin,
} from "lucide-react";

export default function AboutUs() {
  const milestones = [
    {
      year: "2019",
      event: "CrowdFund Founded",
      description: "Started with a vision to democratize project funding",
    },
    {
      year: "2020",
      event: "1,000 Projects Funded",
      description: "Reached our first major milestone during challenging times",
    },
    {
      year: "2022",
      event: "Global Expansion",
      description: "Expanded operations to over 25 countries worldwide",
    },
    {
      year: "2024",
      event: "10,000+ Success Stories",
      description: "Celebrating a decade of bringing dreams to life",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We prioritize the safety of our community with robust security measures and transparent processes.",
    },
    {
      icon: Heart,
      title: "Community First",
      description:
        "Our platform is built around fostering genuine connections between creators and supporters.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously evolve our platform to better serve the needs of modern creators and backers.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we do, from user experience to customer support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              About CrowdFund
            </h1>
            <div className="bg-blue-600 text-white p-2 rounded-lg shadow-md">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize funding and empower creators
            worldwide to bring their innovative ideas to life through community
            support.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  CrowdFund was born from a simple belief: that great ideas
                  shouldn't be limited by traditional funding barriers. Founded
                  in 2019, we started as a small team of entrepreneurs who had
                  experienced firsthand the challenges of bringing creative
                  projects to market.
                </p>
                <p>
                  Today, we've grown into a global platform that has helped
                  thousands of creators raise millions in funding for their
                  projects. From tech innovations to artistic endeavors, from
                  social causes to entrepreneurial ventures, we've been
                  privileged to be part of countless success stories.
                </p>
                <p>
                  Our platform connects passionate creators with equally
                  passionate supporters, creating a community where innovation
                  thrives and dreams become reality.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80"
                alt="Team collaboration and innovation"
                className="rounded-lg shadow-md w-full max-w-md"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To democratize funding and make it possible for anyone with a
              great idea to find the support they need to make it happen. We
              believe innovation shouldn't be constrained by traditional funding
              limitations.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To create a world where every creative idea has the opportunity to
              flourish, supported by a global community that values innovation,
              creativity, and positive impact.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            How CrowdFund Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-6 h-6 text-blue-500 mr-2" />
                For Creators
              </h3>
              <p className="text-gray-700 mb-4">
                Share your project with our community, set a funding goal, and
                engage with supporters who believe in your vision.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Create compelling project campaigns</li>
                <li>• Set flexible or fixed funding targets</li>
                <li>• Engage directly with your backers</li>
                <li>• Share regular progress updates</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Heart className="w-6 h-6 text-purple-500 mr-2" />
                For Backers
              </h3>
              <p className="text-gray-700 mb-4">
                Discover amazing projects and contribute to the ones that
                inspire you most.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Browse diverse project categories</li>
                <li>• Support creators you believe in</li>
                <li>• Receive exclusive project rewards</li>
                <li>• Track project progress and updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="flex items-start p-4">
                <div className="bg-gray-100 rounded-lg p-3 mr-4">
                  <value.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full px-4 py-2 font-bold text-sm mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Contact Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful creators who have already brought
              their ideas to life through CrowdFund.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">For Creators</h3>
              <p className="text-gray-600 text-sm">
                Launch your campaign and connect with supporters
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">For Backers</h3>
              <p className="text-gray-600 text-sm">
                Discover and support amazing projects
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Success Focused
              </h3>
              <p className="text-gray-600 text-sm">
                Dedicated support throughout your journey
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                onClick={() => (window.location.href = "/create")}
              >
                Start Your Campaign
              </button>
              <button
                className="border-2 border-blue-600 text-blue-600 py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                onClick={() => (window.location.href = "/browse")}
              >
                Explore Projects
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Questions? Contact us at{" "}
              <span className="font-medium text-blue-600">
                hello@crowdfund.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
