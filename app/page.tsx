"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { QuestionManagement } from "@/components/question-management"
import { CommissionManagement } from "@/components/commission-management"
import { GroupManagement } from "@/components/group-management"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "questions":
        return <QuestionManagement />
      case "commission":
        return <CommissionManagement />
      case "groups":
        return <GroupManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
