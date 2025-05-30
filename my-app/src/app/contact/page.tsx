"use client"
import { useState } from "react";
import MultiSelect from "@/components/MultiSelectDropdown";
export default function ContactPage() {
  const optionsList = ["Whatsapp", "Email", "Telegram","a","gyh","bjhb","bjkbjknjk"];
  const [selectedMedium, setSelectedMedium] = useState<string[]>([]);
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>This is the contact page. Add your contact form or info here.</p>
      <MultiSelect
        options={optionsList}
        selected={selectedMedium}
        onChange={setSelectedMedium}
      />
      <p>Selected: {selectedMedium.join(", ")}</p>

    </div>
  );
}
