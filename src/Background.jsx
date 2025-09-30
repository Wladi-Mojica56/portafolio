import React, { useEffect, useRef } from 'react';
import styles from './Background.module.css';

const CANVAS_CONFIG = {
    MAX_PARTICLES: 80,
    MOUSE_INFLUENCE_RADIUS: 150,
    FADE_ALPHA: 0.05,
    BACKGROUND_COLOR: 'rgba(8, 8, 15, 0.05)'
};

const PARTICLE_CONFIG = {
    MIN_SIZE: 1,
    MAX_SIZE: 3,
    MIN_OPACITY: 0.1,
    MAX_OPACITY: 0.3,
    MIN_VELOCITY: -0.15,
    MAX_VELOCITY: 0.15,
    MIN_LIFESPAN: 300,
    MAX_LIFESPAN: 500,
    HUE_BASE: 200,
    HUE_RANGE: 60,
    FRICTION: 0.998,
    BOUNCE_DAMPING: 0.8
};

const ANIMATION_CONFIG = {
    PULSE_SPEED: 0.002,
    ROTATION_SPEED_SQUARE: 0.001,
    ROTATION_SPEED_TRIANGLE: 0.0008,
    PULSE_AMPLITUDE: 0.4,
    PULSE_OFFSET: 0.8
};

const PARTICLE_SHAPES = {
    CIRCLE: 0,
    SQUARE: 1,
    TRIANGLE: 2
};

const GeometricParticles = () => {
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        const particles = [];

        const initializeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        };

        const createRandomFloat = (min, max) => Math.random() * (max - min) + min;
        const createRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        class GeometricParticle {
        constructor() {
            this.initializeParticle();
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        initializeParticle() {
            this.position = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
            };
            
            this.velocity = {
            x: createRandomFloat(PARTICLE_CONFIG.MIN_VELOCITY, PARTICLE_CONFIG.MAX_VELOCITY),
            y: createRandomFloat(PARTICLE_CONFIG.MIN_VELOCITY, PARTICLE_CONFIG.MAX_VELOCITY)
            };

            this.size = createRandomFloat(PARTICLE_CONFIG.MIN_SIZE, PARTICLE_CONFIG.MAX_SIZE);
            this.maxSize = this.size;
            this.opacity = createRandomFloat(PARTICLE_CONFIG.MIN_OPACITY, PARTICLE_CONFIG.MAX_OPACITY);
            this.maxOpacity = this.opacity;
            this.hue = PARTICLE_CONFIG.HUE_BASE + Math.random() * PARTICLE_CONFIG.HUE_RANGE;
            this.shape = createRandomInteger(0, 2);
            this.age = 0;
            this.maxAge = createRandomFloat(PARTICLE_CONFIG.MIN_LIFESPAN, PARTICLE_CONFIG.MAX_LIFESPAN);
        }

        updatePosition() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        updateSize(currentTime) {
            const pulseValue = Math.sin(currentTime * ANIMATION_CONFIG.PULSE_SPEED + this.pulsePhase) * 0.5 + 0.5;
            this.size = this.maxSize * (ANIMATION_CONFIG.PULSE_OFFSET + pulseValue * ANIMATION_CONFIG.PULSE_AMPLITUDE);
        }

        handleMouseInteraction() {
            const deltaX = mousePositionRef.current.x - this.position.x;
            const deltaY = mousePositionRef.current.y - this.position.y;
            const distanceToMouse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distanceToMouse < CANVAS_CONFIG.MOUSE_INFLUENCE_RADIUS) {
            const influenceStrength = (CANVAS_CONFIG.MOUSE_INFLUENCE_RADIUS - distanceToMouse) / CANVAS_CONFIG.MOUSE_INFLUENCE_RADIUS;
            this.size = this.maxSize * (1 + influenceStrength * 0.8);
            this.opacity = Math.min(0.6, this.maxOpacity + influenceStrength * 0.3);
            } else {
            this.opacity = this.maxOpacity;
            }
        }

        handleBoundaryCollision() {
            const isOutOfBoundsX = this.position.x < 0 || this.position.x > canvas.width;
            const isOutOfBoundsY = this.position.y < 0 || this.position.y > canvas.height;

            if (isOutOfBoundsX) this.velocity.x *= -PARTICLE_CONFIG.BOUNCE_DAMPING;
            if (isOutOfBoundsY) this.velocity.y *= -PARTICLE_CONFIG.BOUNCE_DAMPING;
        }

        applyFriction() {
            this.velocity.x *= PARTICLE_CONFIG.FRICTION;
            this.velocity.y *= PARTICLE_CONFIG.FRICTION;
        }

        shouldReset() {
            return this.age > this.maxAge;
        }

        update(currentTime) {
            this.age++;
            
            this.updatePosition();
            this.updateSize(currentTime);
            this.handleMouseInteraction();
            this.handleBoundaryCollision();
            this.applyFriction();

            if (this.shouldReset()) {
            this.initializeParticle();
            }
        }

        createGradient(context) {
            const gradient = context.createRadialGradient(
            this.position.x, this.position.y, 0,
            this.position.x, this.position.y, this.size * 3
            );
            gradient.addColorStop(0, `hsl(${this.hue}, 70%, 60%)`);
            gradient.addColorStop(1, `hsl(${this.hue}, 70%, 60%, 0)`);
            return gradient;
        }

        drawCircle(context) {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
            context.fill();
        }

        drawSquare(context, currentTime) {
            context.translate(this.position.x, this.position.y);
            context.rotate(currentTime * ANIMATION_CONFIG.ROTATION_SPEED_SQUARE);
            context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        drawTriangle(context, currentTime) {
            context.translate(this.position.x, this.position.y);
            context.rotate(currentTime * ANIMATION_CONFIG.ROTATION_SPEED_TRIANGLE);
            context.beginPath();
            context.moveTo(0, -this.size);
            context.lineTo(-this.size * 0.8, this.size * 0.5);
            context.lineTo(this.size * 0.8, this.size * 0.5);
            context.closePath();
            context.fill();
        }

        render(context, currentTime) {
            context.save();
            context.globalAlpha = this.opacity;
            context.fillStyle = this.createGradient(context);

            switch (this.shape) {
            case PARTICLE_SHAPES.CIRCLE:
                this.drawCircle(context);
                break;
            case PARTICLE_SHAPES.SQUARE:
                this.drawSquare(context, currentTime);
                break;
            case PARTICLE_SHAPES.TRIANGLE:
                this.drawTriangle(context, currentTime);
                break;
            }

            context.restore();
        }
        }

        const initializeParticles = () => {
        for (let i = 0; i < CANVAS_CONFIG.MAX_PARTICLES; i++) {
            particles.push(new GeometricParticle());
        }
        };

        const clearCanvas = (context) => {
        context.fillStyle = CANVAS_CONFIG.BACKGROUND_COLOR;
        context.fillRect(0, 0, canvas.width, canvas.height);
        };

        const updateAndRenderParticles = (context, currentTime) => {
        particles.forEach(particle => {
            particle.update(currentTime);
            particle.render(context, currentTime);
        });
        };

        const animationLoop = (currentTime) => {
        clearCanvas(context);
        updateAndRenderParticles(context, currentTime);
        animationFrameRef.current = requestAnimationFrame(animationLoop);
        };

        const handleMouseMovement = (event) => {
        mousePositionRef.current = {
            x: event.clientX,
            y: event.clientY
        };
        };

        const handleWindowResize = () => {
        initializeCanvas();
        };

        // Initialize
        initializeCanvas();
        initializeParticles();
        
        // Event listeners
        window.addEventListener('resize', handleWindowResize);
        canvas.addEventListener('mousemove', handleMouseMovement);
        
        // Start animation
        animationLoop(0);

        // Cleanup function
        return () => {
        window.removeEventListener('resize', handleWindowResize);
        canvas.removeEventListener('mousemove', handleMouseMovement);
        
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.particlesContainer} />;
};

export default GeometricParticles;