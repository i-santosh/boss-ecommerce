import React from 'react';
import { Card, CardContent,Button } from "../ui-card/card,button.jsx"

function Faq(props) {
    return (
        <section className="bg-pink-50 p-6 mt-6 rounded-lg shadow">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 ">
              <div>
                <h3 className="font-bold">How do I update my profile information?</h3>
                <p>You can update your profile by clicking the "Edit" buttons next to your details.</p>
              </div>
              <div>
                <h3 className="font-bold">Can I change my email address?</h3>
                <p>Yes, you can edit your email address by clicking the "Edit" button in the Email Address section.</p>
              </div>
              <div>
                <h3 className="font-bold">How do I add a mobile number?</h3>
                <p>Click on the "Edit" button next to the Mobile Number section to add your number.</p>
              </div>
            </div>
            <div className="mt-4 ">
              <Button className="contactSupport-myaccount" onClick={() => alert('Contact Support')}>Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
}

export default Faq;