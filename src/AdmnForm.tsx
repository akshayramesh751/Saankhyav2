import React, { useState } from 'react';

const ApplyNowModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Manually construct the message string from all form fields
    const studentName = formData.get('student_name');
    const studentClass = formData.get('student_class');
    const studentSchool = formData.get('student_school');
    const parentName = formData.get('parent_name');
    const parentContact = formData.get('parent_contact');
    const parentEmail = formData.get('parent_email');
    const board = formData.get('board');

    const messageBody = `
      Admission Form Submission
      ---------------------------------
      Student's Name: ${studentName}
      Student's Class: ${studentClass}
      Student's School: ${studentSchool}
      Parent's Name: ${parentName}
      Parent's Contact: ${parentContact}
      Parent's Email: ${parentEmail}
      Board of Education: ${board}
    `;

    // Append the custom message to the FormData object
    formData.append('message', messageBody);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  if (!open) return null;

  return (
    <div className="fixed top-14 left-0 w-full h-full flex items-start justify-center z-[10001] bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 mt-16 relative animate-fade-in-up max-h-[70vh] overflow-y-auto">
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 text-2xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center font-serif">Admission Form</h2>
          {formStatus === 'success' ? (
            <div className="text-green-600 text-center font-semibold py-8">
              🎉 Application submitted successfully!<br />We will contact you soon.
            </div>
          ) : (
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="access_key" value="59123046-13a5-4f6d-b4db-754756d3d7e3" />
              <input type="hidden" name="subject" value="New Admission Form Submission" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student's Name</label>
                <input
                  type="text"
                  name="student_name"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student's Grade</label>
                <select
                  name="student_class"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                >
                  <option value="">Select Grade</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>PU I</option>
                  <option>PU II</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student's School</label>
                <input
                  type="text"
                  name="student_school"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Name</label>
                <input
                  type="text"
                  name="parent_name"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Contact Number</label>
                <input
                  type="text"
                  name="parent_contact"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Email ID</label>
                <input
                  type="email"
                  name="parent_email"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Board of Education</label>
                <select
                  name="board"
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 font-medium"
                >
                  <option value="">Select Board</option>
                  <option>ICSE</option>
                  <option>CBSE</option>
                  <option>NCERT</option>
                  <option>State Board</option>
                </select>
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-blue-900 text-white hover:bg-orange-500`}
                disabled={formStatus === 'sending'}
              >
                Apply Now
              </button>
              {formStatus === 'error' && (
                <div className="text-red-500 text-center">Submission failed. Please try again.</div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AboutApplyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed right-6 top-24 ">
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-blue-900 border border-blue-900 px-4 py-2 rounded-full font-semibold text-md shadow-lg hover:bg-blue-900 hover:text-white transition-all duration-300
            ring-2 ring-blue-400 ring-offset-2
            animate-glow-border
            "
        >
          APPLY NOW
        </button>
      </div>
      <ApplyNowModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

