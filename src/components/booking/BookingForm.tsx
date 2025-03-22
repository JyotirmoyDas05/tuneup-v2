import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface BookingFormProps {
  venueId: string;
  venueName: string;
  onBookingComplete: () => void;
}

export default function BookingForm({ venueId, venueName, onBookingComplete }: BookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async () => {
    setIsSubmitting(true);
    try {
      // Here you would replace this URL with your actual Google Form URL
      const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdnjGyEX4nn-RdwUipxEvu0Ec9fg4x0t6TsmPVIdXpMdcNi6w/viewform?usp=header`;
      
      // Open Google Form in a new tab
      window.open(googleFormUrl, '_blank');

      // Simulate form submission (in real implementation, you would handle this through Google Forms webhook)
      setTimeout(() => {
        onBookingComplete();
        toast.success('Booking request submitted successfully!');
        router.push(`/collab/venues/${venueId}`);
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error('Failed to submit booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book {venueName}</h2>
        <p className="text-gray-600 mb-6">
          You will be redirected to a Google Form to complete your booking request.
          After submission, you will be notified of the status.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className="flex-1 bg-[#3674B5] text-white px-6 py-3 rounded-full hover:bg-[#2A5C91] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Proceed to Booking Form'}
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 