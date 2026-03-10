// @ts-check
let index = 0;
let intervalId = 0;

let testimonials = [{
    message: '',
    guild: { name: '', iconUrl: '' },
    author: { name: '', position: '', avatarUrl: '' }
}];

function renderTestimonial(index = 0) {
    const testimonial = testimonials[index];
    const indexElement = document.getElementById('testimonial-index');
    const messageElement = document.getElementById('testimonial-message');

    if (indexElement) indexElement.textContent = `${index + 1}/${testimonials.length}`;
    if (messageElement) messageElement.textContent = `"${testimonial.message}"`;

    const guildIcon = document.getElementById('testimonial-guild-icon');
    const guildName = document.getElementById('testimonial-guild-name');

    // @ts-expect-error
    if (guildIcon) guildIcon.src = testimonial.guild.iconUrl;
    if (guildName) guildName.textContent = testimonial.guild.name;

    const authorNameElement = document.getElementById('testimonial-author-name');
    const authorAvatarElement = document.getElementById('testimonial-author-avatar');
    const authorPositionElement = document.getElementById('testimonial-author-position');

    // @ts-expect-error
    if (authorAvatarElement) authorAvatarElement.src = testimonial.author.avatarUrl;
    if (authorPositionElement) authorPositionElement.textContent = testimonial.author.position;
    if (authorNameElement) authorNameElement.textContent = testimonial.author.name;
};

setTimeout(async () => {
    document.getElementById('prev-testimonial')?.addEventListener('click', () => {
        prevTestimonial();
        resetAutoSlide();
    });

    document.getElementById('next-testimonial')?.addEventListener('click', () => {
        nextTestimonial();
        resetAutoSlide();
    });

    const hasTestimonials = await fetchTestimonials();
    if (hasTestimonials) startAutoSlide();
}, 250);

function startAutoSlide() {
    intervalId = setInterval(nextTestimonial, 15_000);
};

function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
};

function prevTestimonial() {
    index = (index - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(index);
};

function nextTestimonial() {
    index = (index + 1) % testimonials.length;
    renderTestimonial(index);
};

async function fetchTestimonials() {
    const response = await fetch(`https://api.fyre.bot/testimonials`).catch(() => {});

    if (!response?.ok) return false;
    const responseBody = await response.json();

    if (responseBody.data.length > 0) {
        testimonials = responseBody.data;
        return true;
    }

    return false;
};
