/*
Next.js page (pages/index.jsx)
Requirements:
 - Tailwind CSS must be set up in the project.
 - Place your images/SVGs under /public/assets/ (logo.png, lang.svg, menu.svg, social-fb.svg, social-ig.svg, social-tt.svg, slider-top-static.png, slide1.jpg, slide2.jpg, slide3.jpg, illustration.png, partner*.png)
 - This is a single-file page component. Put it in pages/index.jsx (or app/page.jsx with small adjustments).
*/

import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Home(){
  const slides = ['/assets/slide1.jpg','/assets/slide2.jpg','/assets/slide3.jpg']
  const [idx,setIdx] = useState(0)
  const timerRef = useRef(null)
  useEffect(()=>{
    start()
    return ()=> stop()
  },[])
  function start(){ stop(); timerRef.current = setInterval(()=> setIdx(i => (i+1)%slides.length), 4000) }
  function stop(){ if(timerRef.current) { clearInterval(timerRef.current); timerRef.current = null } }
  function go(i){ setIdx((i+slides.length)%slides.length) }

  // touch support
  const touchStartX = useRef(0)
  function onTouchStart(e){ touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e){ const end = e.changedTouches[0].clientX; if(end - touchStartX.current > 30) go(idx-1); else if(touchStartX.current - end > 30) go(idx+1) }

  // mobile menu overlay
  const [menuOpen,setMenuOpen] = useState(false)

  return (
    <div dir="rtl" className="min-h-screen bg-[#efefef] text-[#222] font-[Cairo]">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
        <title>T-Sign - الصفحة الرئيسية</title>
      </Head>

      <div className="max-w-[1150px] mx-auto p-6">
        {/* header */}
        <header className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-3 order-1" style={{marginRight:0}}>
            <img src="/assets/logo.png" alt="logo" className="w-18 h-18 rounded-full object-contain bg-transparent" />
            <button className="border-2 border-gray-300 rounded-lg px-4 py-2 font-extrabold" >تسجيل</button>
          </div>

          <div className="flex items-center gap-3 order-2">
            <button className="w-10 h-10 rounded-md" aria-label="تبديل اللغة"><img src="/assets/lang.svg" alt="lang" className="w-5 h-5"/></button>
            <div className="w-[1px] h-7 bg-gray-300 mr-2" />
            <nav className="hidden md:flex gap-4 items-center font-bold">
              <a href="#" className="px-3 py-2 rounded-md">الرئيسية</a>
              <a href="#" className="px-3 py-2 rounded-md">تواصل</a>
              <a href="#" className="px-3 py-2 rounded-md">سلتك</a>
            </nav>
            <div className="hidden md:flex gap-2 items-center">
              <img src="/assets/social-fb.svg" alt="fb" className="w-6 h-6"/>
              <img src="/assets/social-tt.svg" alt="tt" className="w-6 h-6"/>
              <img src="/assets/social-ig.svg" alt="ig" className="w-6 h-6"/>
            </div>

            {/* mobile menu button */}
            <button onClick={()=>setMenuOpen(true)} className="md:hidden w-11 h-11 flex items-center justify-center" aria-label="menu">
              <img src="/assets/menu.svg" alt="menu" className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* hero */}
        <main className="grid md:grid-cols-[48%_52%] gap-7 mt-6 items-start">
          <section className="left">
            <h1 className="text-[88px] font-black leading-[0.9]">اختار</h1>
            <div className="text-[15px] text-[#7a7a7a] font-semibold">اللون - المقاس - الطباعة - التطريز - النوع - الخاصة</div>
            <p className="mt-4 text-[18px]">كل دة تقدر تفصله وتختاره وتعدل عليه فآي وقت على زوقك وتشتريه ويوصلك لحد باب بيتك</p>
            <a href="#" className="inline-block mt-5 bg-[#222] text-white px-8 py-4 rounded-xl font-extrabold border-2 border-[#222]">ابدأ</a>
            <p className="text-sm text-[#7a7a7a] mt-4">مع تي - زايِن .. وليس</p>
            <p className="text-xs text-[#7a7a7a] mt-2">جرّب صمم قطعة بدون تسجيل دخول او عملية دفع مسبقة</p>
          </section>

          <aside className="right">
            <div className="bg-white rounded-xl p-3 shadow-[0_6px_0_rgba(0,0,0,0.06)]">
              <div className="h-18 rounded-lg overflow-hidden mb-3 bg-[#fafafa] flex items-center justify-center">
                <img src="/assets/slider-top-static.png" alt="static" className="w-full h-full object-cover" />
              </div>

              <div className="relative rounded-lg overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-md" onClick={()=>{ stop(); go(idx-1); start(); }} aria-label="prev">◀</button>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-md" onClick={()=>{ stop(); go(idx+1); start(); }} aria-label="next">▶</button>

                <div className="whitespace-nowrap transition-transform duration-500" style={{transform:`translateX(-${idx*100}%)`}}>
                  {slides.map((s,i)=> (
                    <div key={i} className="inline-block w-full align-top">
                      <img src={s} alt={`slide-${i}`} className="w-full h-[320px] object-cover block rounded-md" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-3 mt-3">
                  {slides.map((_,i)=> (
                    <div key={i} onClick={()=>go(i)} className={`h-2 w-16 rounded-md ${i===idx? 'bg-[#444]' : 'bg-[#d0d0d0]'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </main>

        <div className="w-7/12 mx-auto h-[1px] bg-[#d6d6d6] my-9 rounded-sm" />

        <section className="grid md:grid-cols-[46%_54%] gap-7 items-center">
          <div className="illustr">
            <img src="/assets/illustration.png" alt="illustr" className="w-full block" />
          </div>

          <div className="bg-[#b71c1c] text-white p-8 rounded-md font-bold">
            <p>تي زايْن ، هو مشروع يعطي الحرية الكاملة للعميل فاختيار ملابسه من ملابس عن طريق تصميم الملابس من خيارات عديدة مثل: اختيار اللون، الحجم، الطباعة، التطريز، وطرق الدفع - حتى تصل لباب بيته.</p>
            <br/>
            <p>كأنه يصنعه من الصفر كامل على جهازه وبنفس سعر الاسواق وذلك يعطي شعور رائع عند استلامه للمنتج، كما يمكنه أيضًا طلب تصميم خاص به لا يعمله احد ليقوم موظفينا بتصميمه.</p>
          </div>
        </section>

        <div className="w-7/12 mx-auto h-[1px] bg-[#dcdcdc] my-5 rounded-sm" />

        <div className="flex justify-end"><h3 className="text-xl font-bold">تابع أيضًا</h3></div>
        <div className="flex items-center justify-center gap-8 mt-4">
          <img src="/assets/partner1.png" alt="p1" className="h-14 opacity-90" />
          <img src="/assets/partner2.png" alt="p2" className="h-14 opacity-90" />
          <img src="/assets/partner3.png" alt="p3" className="h-14 opacity-90" />
          <img src="/assets/partner4.png" alt="p4" className="h-14 opacity-90" />
        </div>

      </div>

      {/* footer */}
      <footer className="bg-[#2f2f2f] text-[#dcdcdc] mt-12">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row items-start justify-between gap-6 px-6 py-10">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <img src="/assets/logo.png" alt="logo" className="w-[110px] h-[110px] rounded-md object-contain bg-transparent" />
              <div className="text-[#cfcfcf] max-w-[420px] text-sm">
                <div className="font-bold">Intellectual property rights and all rights of the site are reserved.</div>
                <div>حقوق الملكية الفكرية و جميع حقوق الموقع محفوظة</div>
              </div>
            </div>

            <div className="flex gap-4">
              <img src="/assets/partner-sm1.png" alt="l1" className="h-9 opacity-70" />
              <img src="/assets/partner-sm2.png" alt="l2" className="h-9 opacity-70" />
              <img src="/assets/partner-sm3.png" alt="l3" className="h-9 opacity-70" />
              <img src="/assets/partner-sm4.png" alt="l4" className="h-9 opacity-70" />
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="text-white font-extrabold">يمكنك التواصل معنا على :</div>
            <div className="flex items-center gap-3">
              <div className="font-bold">@t_sign.art</div>
              <div className="flex items-center gap-2">
                <img src="/assets/social-fb.svg" alt="fb" className="w-7 h-7" />
                <img src="/assets/social-ig.svg" alt="ig" className="w-7 h-7" />
                <img src="/assets/social-tt.svg" alt="tt" className="w-7 h-7" />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <a href="tel:01002341982" className="font-bold text-white">01002341982</a>
              <a href="tel:01509471842" className="font-bold text-white">01509471842</a>
            </div>

            <a href="mailto:info@t-sign.art" className="inline-block px-3 py-2 border-b-2 border-[#cfcfcf] text-white rounded">info@t-sign.art</a>
            <div className="text-[#cfcfcf] text-sm max-w-[360px] text-right">تي زايْن ، مشروع يعطي الحرية الكاملة للعميل في اختيار وتخصيص ملابسه مع فريق تصميم جاهز لتلبية طلبك.</div>
          </div>
        </div>
      </footer>

      {/* mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-start justify-end p-4" onClick={()=>setMenuOpen(false)}>
          <div className="w-72 bg-white rounded-lg p-4" onClick={(e)=>e.stopPropagation()}>
            <button className="float-left font-extrabold mb-3" onClick={()=>setMenuOpen(false)}>إغلاق ×</button>
            <nav className="mt-8 flex flex-col gap-2">
              <a href="#" className="py-3 font-bold">الرئيسية</a>
              <a href="#" className="py-3 font-bold">تواصل</a>
              <a href="#" className="py-3 font-bold">سلتك</a>
              <a href="#" className="py-3 font-bold">ابدأ</a>
            </nav>

            <div className="mt-5 flex gap-3 items-center">
              <img src="/assets/social-fb.svg" className="w-8 h-8" />
              <img src="/assets/social-ig.svg" className="w-8 h-8" />
              <img src="/assets/social-tt.svg" className="w-8 h-8" />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ensure Cairo font applied */
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');
        html,body,#__next{height:100%}
        body{font-family: 'Cairo', sans-serif}
      `}</style>
    </div>
  )
}

