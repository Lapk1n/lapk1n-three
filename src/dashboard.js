const examples = [
    { title: 'Basics', items: [
        ['Start', './basics/start.js'], ['Group', './basics/group.js'], ['Animation', './basics/animation.js'],
        ['Camera', './basics/camera.js'], ['Fullscreen & resize', './basics/fullscreen-resize.js'],
        ['Textures', './basics/textures.js'], ['Materials', './basics/material.js'], ['Text', './basics/text.js'], ['GUI', './basics/gui.js'],
    ] },
    { title: 'Classic technics', items: [
        ['Light', './classic-technics/light.js'], ['Shadows', './classic-technics/shadows.js'],
        ['Haunted house', './classic-technics/haunted-house.js'], ['Particles', './classic-technics/particles.js'],
        ['Galaxy generator', './classic-technics/galaxy-generator.js'], ['Scroll-based animation', './classic-technics/scroll-based-animation.js'],
    ] },
    { title: 'Advanced technics', items: [
        ['Physics', './advanced-technics/physics.js'], ['Models', './advanced-technics/models.js'], ['Raycaster and mouse events', '/advanced-technics/raycaster_and_mouse_event.js']
    ] },
]

const allItems = examples.flatMap((group) => group.items)
const loaders = new Map([
    ['./basics/start.js', () => import('./basics/start.js')],
    ['./basics/group.js', () => import('./basics/group.js')],
    ['./basics/animation.js', () => import('./basics/animation.js')],
    ['./basics/camera.js', () => import('./basics/camera.js')],
    ['./basics/fullscreen-resize.js', () => import('./basics/fullscreen-resize.js')],
    ['./basics/textures.js', () => import('./basics/textures.js')],
    ['./basics/material.js', () => import('./basics/material.js')],
    ['./basics/text.js', () => import('./basics/text.js')],
    ['./basics/gui.js', () => import('./basics/gui.js')],
    ['./classic-technics/light.js', () => import('./classic-technics/light.js')],
    ['./classic-technics/shadows.js', () => import('./classic-technics/shadows.js')],
    ['./classic-technics/haunted-house.js', () => import('./classic-technics/haunted-house.js')],
    ['./classic-technics/particles.js', () => import('./classic-technics/particles.js')],
    ['./classic-technics/galaxy-generator.js', () => import('./classic-technics/galaxy-generator.js')],
    ['./classic-technics/scroll-based-animation.js', () => import('./classic-technics/scroll-based-animation.js')],
    ['./advanced-technics/physics.js', () => import('./advanced-technics/physics.js')],
    ['./advanced-technics/models.js', () => import('./advanced-technics/models.js')],
    ['/advanced-technics/raycaster_and_mouse_event.js', () => import('./advanced-technics/raycaster_and_mouse_event.js')]
])
const params = new URLSearchParams(window.location.search)
const selectedPath = params.get('script')
const selectedName = allItems.find(([, path]) => path === selectedPath)?.[0]
const list = document.querySelector('#scriptList')
const status = document.querySelector('#scriptStatus')
const hint = document.querySelector('.stage__hint')
const dashboardToggle = document.querySelector('#dashboardToggle')
const dashboardClose = document.querySelector('#dashboardClose')

const setDashboardOpen = (isOpen) => {
    document.body.classList.toggle('dashboard-open', isOpen)
    dashboardToggle.setAttribute('aria-expanded', String(isOpen))
}

dashboardToggle.addEventListener('click', () => {
    setDashboardOpen(!document.body.classList.contains('dashboard-open'))
})

dashboardClose.addEventListener('click', () => setDashboardOpen(false))

const setSelectedButton = (path) => {
    document.querySelectorAll('.script-button').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.path === path)
    })
}

const resetPreview = () => {
    document.querySelectorAll('.lil-gui').forEach((gui) => gui.remove())

    const canvas = document.querySelector('.webgl')
    canvas.replaceWith(canvas.cloneNode())
}

const loadExample = async (path, { updateUrl = true } = {}) => {
    const name = allItems.find(([, itemPath]) => itemPath === path)?.[0]
    if (!name) return

    if (updateUrl) {
        const next = new URL(window.location.href)
        next.searchParams.set('script', path)
        window.history.pushState({ script: path }, '', next)
    }

    setSelectedButton(path)
    setDashboardOpen(false)
    status.textContent = `Loading · ${name}`
    hint.hidden = true
    resetPreview()

    try {
        await loaders.get(path)?.()
        status.textContent = `Loaded · ${name}`
    } catch (error) {
        console.error(error)
        status.textContent = `Could not load · ${name}`
        hint.textContent = 'Open the browser console for the module error.'
        hint.hidden = false
    }
}

for (const group of examples) {
    const section = document.createElement('section')
    section.className = 'script-group'
    const heading = document.createElement('h2')
    heading.textContent = group.title
    section.append(heading)

    for (const [name, path] of group.items) {
        const button = document.createElement('button')
        button.className = 'script-button'
        button.type = 'button'
        button.textContent = name
        button.dataset.path = path
        button.addEventListener('click', () => loadExample(path))
        section.append(button)
    }
    list.append(section)
}

if (selectedName) loadExample(selectedPath, { updateUrl: false })
else setDashboardOpen(true)

document.querySelector('#clearScript').addEventListener('click', () => {
    window.history.pushState({}, '', window.location.pathname)
    document.querySelectorAll('.script-button').forEach((button) => button.classList.remove('is-active'))
    resetPreview()
    status.textContent = 'No example selected'
    hint.textContent = 'Select an example from the dashboard'
    hint.hidden = false
})

window.addEventListener('popstate', () => {
    const path = new URLSearchParams(window.location.search).get('script')
    if (path) loadExample(path, { updateUrl: false })
    else {
        document.querySelectorAll('.script-button').forEach((button) => button.classList.remove('is-active'))
        resetPreview()
        status.textContent = 'No example selected'
        hint.textContent = 'Select an example from the dashboard'
        hint.hidden = false
    }
})
