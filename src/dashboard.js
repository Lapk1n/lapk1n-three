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
        ['Physics', './advanced-technics/physics.js'], ['Models', './advanced-technics/models.js'],
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
])
const params = new URLSearchParams(window.location.search)
const selectedPath = params.get('script')
const selectedName = allItems.find(([, path]) => path === selectedPath)?.[0]
const list = document.querySelector('#scriptList')
const status = document.querySelector('#scriptStatus')
const hint = document.querySelector('.stage__hint')

const loadExample = (path) => {
    const next = new URL(window.location.href)
    next.searchParams.set('script', path)
    window.location.assign(next)
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

if (selectedName) {
    document.querySelector(`[data-path="${CSS.escape(selectedPath)}"]`)?.classList.add('is-active')
    status.textContent = `Loaded · ${selectedName}`
    hint.hidden = true
    loaders.get(selectedPath)?.().catch((error) => {
        console.error(error)
        status.textContent = `Could not load · ${selectedName}`
        hint.textContent = 'Open the browser console for the module error.'
        hint.hidden = false
    })
}

document.querySelector('#clearScript').addEventListener('click', () => {
    const next = new URL(window.location.href)
    next.search = ''
    window.location.assign(next)
})
