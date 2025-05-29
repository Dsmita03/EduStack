import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(dummyDashboardData)

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [getToken, backendUrl])

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
  }, [isEducator, fetchDashboardData])

  if (!dashboardData) return <Loading />

  return (
    <div className="min-h-screen flex flex-col items-start justify-between gap-6 md:p-10 p-6 bg-blue-50">
      <div className="space-y-8 w-full max-w-7xl mx-auto">
        {/* Stats cards */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {[
            {
              icon: assets.patients_icon,
              value: dashboardData.enrolledStudentsData.length,
              label: 'Total Enrollment',
              borderColor: 'border-blue-400',
              bgHover: 'hover:bg-blue-100',
            },
            {
              icon: assets.appointments_icon,
              value: dashboardData.totalCourses,
              label: 'Total Courses',
              borderColor: 'border-blue-400',
              bgHover: 'hover:bg-blue-100',
            },
            {
              icon: assets.earning_icon,
              value: currency + dashboardData.totalEarnings,
              label: 'Total Earnings',
              borderColor: 'border-blue-400',
              bgHover: 'hover:bg-blue-100',
            },
          ].map(({ icon, value, label, borderColor, bgHover }, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-5 rounded-lg shadow-lg border ${borderColor} bg-white transition transform hover:scale-105 ${bgHover} cursor-default min-w-[220px]`}
            >
              <img src={icon} alt={`${label} icon`} className="w-12 h-12" />
              <div>
                <p className="text-3xl font-semibold text-blue-900">{value}</p>
                <p className="text-sm text-blue-600">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Enrollments */}
        <section className="bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-900 px-6 py-4 border-b border-blue-300">
            Latest Enrollments
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-blue-900">
              <thead className="bg-blue-100 text-blue-800 text-sm uppercase font-semibold tracking-wide">
                <tr>
                  <th className="px-6 py-4 hidden sm:table-cell w-12 text-center">#</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Course Title</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.enrolledStudentsData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-blue-700">
                      No enrollments yet.
                    </td>
                  </tr>
                ) : (
                  dashboardData.enrolledStudentsData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-center hidden sm:table-cell">{index + 1}</td>
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img
                          src={item.student.imageUrl}
                          alt={item.student.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="truncate max-w-xs">{item.student.name}</span>
                      </td>
                      <td className="px-6 py-4 truncate max-w-md">{item.courseTitle}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
