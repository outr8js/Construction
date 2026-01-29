// SoCal GC Estimator - Main Application

class EstimatorApp {
    constructor() {
        this.currentCounty = 'la';
        this.selectedJob = null;
        this.squareFootage = 0;
        this.qualityTier = 'mid';

        this.init();
    }

    init() {
        this.renderCategories();
        this.bindEvents();
    }

    bindEvents() {
        // County toggle
        document.querySelectorAll('.county-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.county-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCounty = e.target.dataset.county;
                if (this.selectedJob) {
                    this.updateEstimate();
                }
            });
        });

        // Job search
        const searchInput = document.getElementById('job-search');
        searchInput.addEventListener('input', (e) => {
            this.filterJobs(e.target.value);
        });
    }

    renderCategories() {
        const container = document.getElementById('job-categories');
        container.innerHTML = '';

        PRICING_DATA.categories.forEach(category => {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category';
            categoryEl.innerHTML = `
                <div class="category-header" data-category="${category.id}">
                    <div class="category-icon ${category.colorClass}">
                        ${this.getIcon(category.icon)}
                    </div>
                    <span class="category-title">${category.name}</span>
                    <span class="category-count">${category.jobs.length}</span>
                    <svg class="category-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </div>
                <div class="category-jobs">
                    ${category.jobs.map(job => `
                        <div class="job-item" data-job="${job.id}" data-category="${category.id}">
                            <span class="job-item-name">${job.name}</span>
                            <span class="job-item-price">$${job.pricePerUnit.la.min}-${job.pricePerUnit.la.max}/${job.unit}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(categoryEl);
        });

        // Bind category toggle events
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', () => {
                const category = header.closest('.category');
                category.classList.toggle('expanded');
            });
        });

        // Bind job selection events
        document.querySelectorAll('.job-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.job-item').forEach(j => j.classList.remove('selected'));
                item.classList.add('selected');

                const jobId = item.dataset.job;
                const categoryId = item.dataset.category;
                this.selectJob(categoryId, jobId);
            });
        });
    }

    selectJob(categoryId, jobId) {
        const category = PRICING_DATA.categories.find(c => c.id === categoryId);
        const job = category.jobs.find(j => j.id === jobId);

        this.selectedJob = { ...job, categoryName: category.name, categoryColor: category.colorClass };
        this.renderEstimatePanel();
    }

    renderEstimatePanel() {
        const placeholder = document.querySelector('.panel-placeholder');
        const content = document.getElementById('estimate-content');

        placeholder.classList.add('hidden');
        content.classList.remove('hidden');

        const job = this.selectedJob;
        const prices = job.pricePerUnit[this.currentCounty];

        content.innerHTML = `
            <div class="estimate-header">
                <h2>${job.name}</h2>
                <p>${job.description}</p>
            </div>

            <div class="input-section">
                <div class="input-group">
                    <label>Project Size (${job.unit})</label>
                    <input type="number" id="sqft-input" placeholder="Enter ${job.unit}" value="${this.squareFootage || ''}">
                </div>
                <div class="input-group">
                    <label>Quality Tier</label>
                    <select id="quality-select">
                        <option value="low">Budget / Economy</option>
                        <option value="mid" selected>Mid-Range / Standard</option>
                        <option value="high">High-End / Premium</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>County</label>
                    <select id="county-select">
                        <option value="la" ${this.currentCounty === 'la' ? 'selected' : ''}>Los Angeles County</option>
                        <option value="oc" ${this.currentCounty === 'oc' ? 'selected' : ''}>Orange County</option>
                    </select>
                </div>
            </div>

            <div class="price-cards">
                <div class="price-card">
                    <div class="price-card-label">Low Estimate</div>
                    <div class="price-card-value" id="price-low">${formatCurrency(prices.min)}</div>
                    <div class="price-card-unit">per ${job.unit}</div>
                </div>
                <div class="price-card highlight">
                    <div class="price-card-label">Average</div>
                    <div class="price-card-value" id="price-avg">${formatCurrency((prices.min + prices.max) / 2)}</div>
                    <div class="price-card-unit">per ${job.unit}</div>
                </div>
                <div class="price-card">
                    <div class="price-card-label">High Estimate</div>
                    <div class="price-card-value" id="price-high">${formatCurrency(prices.max)}</div>
                    <div class="price-card-unit">per ${job.unit}</div>
                </div>
            </div>

            <div class="total-estimate" id="total-estimate" style="display: none;">
                <div class="total-label">
                    Total Project Estimate
                    <span id="total-sqft"></span>
                </div>
                <div class="total-amount">
                    <div class="total-range" id="total-range"></div>
                    <div class="total-note">Including materials, labor, permits & overhead</div>
                </div>
            </div>

            <div class="breakdown-section" id="breakdown-section" style="display: none;">
                <div class="breakdown-header">
                    <h3>Itemized Breakdown</h3>
                </div>
                <div class="breakdown-table" id="breakdown-table">
                </div>
            </div>

            <div class="timeline-section" id="timeline-section" style="display: none;">
                <div class="timeline-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <h3>Estimated Timeline</h3>
                </div>
                <div class="timeline-grid">
                    <div class="timeline-item">
                        <div class="timeline-value" id="timeline-hours">-</div>
                        <div class="timeline-label">Total Hours</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-value" id="timeline-days">-</div>
                        <div class="timeline-label">Work Days (8hr)</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-value" id="timeline-weeks">-</div>
                        <div class="timeline-label">Approx Weeks</div>
                    </div>
                </div>
            </div>

            <div class="notes-section">
                <h3>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    Important Notes
                </h3>
                <ul>
                    ${job.notes.map(note => `<li>${note}</li>`).join('')}
                    <li>Prices are estimates based on 2024-2025 LA/OC market data</li>
                    <li>Always get 3+ quotes from licensed contractors</li>
                    <li>Add 15-20% contingency for unexpected issues</li>
                </ul>
            </div>
        `;

        // Bind input events
        document.getElementById('sqft-input').addEventListener('input', (e) => {
            this.squareFootage = parseFloat(e.target.value) || 0;
            this.updateEstimate();
        });

        document.getElementById('quality-select').addEventListener('change', (e) => {
            this.qualityTier = e.target.value;
            this.updateEstimate();
        });

        document.getElementById('county-select').addEventListener('change', (e) => {
            this.currentCounty = e.target.value;
            // Update header buttons
            document.querySelectorAll('.county-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.county === this.currentCounty);
            });
            this.updateEstimate();
        });
    }

    updateEstimate() {
        if (!this.selectedJob || !this.squareFootage) return;

        const job = this.selectedJob;
        const prices = job.pricePerUnit[this.currentCounty];

        // Calculate quality tier adjustment
        let tierMultiplier = 1;
        let priceMin, priceMax;

        switch (this.qualityTier) {
            case 'low':
                priceMin = prices.min;
                priceMax = prices.min + (prices.max - prices.min) * 0.3;
                break;
            case 'mid':
                priceMin = prices.min + (prices.max - prices.min) * 0.25;
                priceMax = prices.min + (prices.max - prices.min) * 0.75;
                break;
            case 'high':
                priceMin = prices.min + (prices.max - prices.min) * 0.7;
                priceMax = prices.max;
                break;
        }

        // Update price cards
        document.getElementById('price-low').textContent = formatCurrency(priceMin);
        document.getElementById('price-avg').textContent = formatCurrency((priceMin + priceMax) / 2);
        document.getElementById('price-high').textContent = formatCurrency(priceMax);

        // Calculate totals
        const totalLow = priceMin * this.squareFootage;
        const totalHigh = priceMax * this.squareFootage;
        const totalAvg = (totalLow + totalHigh) / 2;

        // Show total estimate
        const totalSection = document.getElementById('total-estimate');
        totalSection.style.display = 'flex';
        document.getElementById('total-sqft').textContent = `${formatNumber(this.squareFootage)} ${job.unit}`;
        document.getElementById('total-range').textContent = `${formatCurrency(totalLow)} - ${formatCurrency(totalHigh)}`;

        // Calculate and show breakdown
        this.renderBreakdown(totalAvg);

        // Calculate timeline
        this.renderTimeline();
    }

    renderBreakdown(totalAmount) {
        const job = this.selectedJob;
        const section = document.getElementById('breakdown-section');
        const table = document.getElementById('breakdown-table');

        section.style.display = 'block';

        // Calculate breakdown amounts
        const laborAmount = totalAmount * (job.laborPercent / 100);
        const materialAmount = totalAmount * (job.materialPercent / 100);
        const permitAmount = totalAmount * (job.permitPercent / 100);
        const overheadAmount = totalAmount * (job.overheadPercent / 100);

        let html = `
            <div class="breakdown-row header">
                <span>Category</span>
                <span>%</span>
                <span>Rate</span>
                <span>Amount</span>
            </div>
            <div class="breakdown-row">
                <span class="breakdown-item">Labor</span>
                <span class="breakdown-qty">${job.laborPercent}%</span>
                <span class="breakdown-rate">${formatCurrency(laborAmount / this.squareFootage)}/${job.unit}</span>
                <span class="breakdown-total">${formatCurrency(laborAmount)}</span>
            </div>
        `;

        // Add material breakdown
        html += `
            <div class="breakdown-row">
                <span class="breakdown-item">Materials</span>
                <span class="breakdown-qty">${job.materialPercent}%</span>
                <span class="breakdown-rate">${formatCurrency(materialAmount / this.squareFootage)}/${job.unit}</span>
                <span class="breakdown-total">${formatCurrency(materialAmount)}</span>
            </div>
        `;

        // Individual materials
        if (job.materials && job.materials.length > 0) {
            job.materials.forEach(mat => {
                const matAmount = materialAmount * (mat.percentOfMaterial / 100);
                html += `
                    <div class="breakdown-row" style="padding-left: 2rem; background: var(--bg-accent);">
                        <span class="breakdown-item" style="color: var(--text-muted);">↳ ${mat.name}</span>
                        <span class="breakdown-qty" style="color: var(--text-muted);">${mat.percentOfMaterial}%</span>
                        <span class="breakdown-rate"></span>
                        <span class="breakdown-total" style="color: var(--text-secondary);">${formatCurrency(matAmount)}</span>
                    </div>
                `;
            });
        }

        // Add permits and overhead
        if (job.permitPercent > 0) {
            html += `
                <div class="breakdown-row">
                    <span class="breakdown-item">Permits & Fees</span>
                    <span class="breakdown-qty">${job.permitPercent}%</span>
                    <span class="breakdown-rate">-</span>
                    <span class="breakdown-total">${formatCurrency(permitAmount)}</span>
                </div>
            `;
        }

        html += `
            <div class="breakdown-row">
                <span class="breakdown-item">Overhead & Profit</span>
                <span class="breakdown-qty">${job.overheadPercent}%</span>
                <span class="breakdown-rate">-</span>
                <span class="breakdown-total">${formatCurrency(overheadAmount)}</span>
            </div>
            <div class="breakdown-row" style="background: var(--bg-accent); font-weight: 600;">
                <span class="breakdown-item">TOTAL</span>
                <span class="breakdown-qty">100%</span>
                <span class="breakdown-rate">-</span>
                <span class="breakdown-total" style="color: var(--accent-blue); font-size: 1.1rem;">${formatCurrency(totalAmount)}</span>
            </div>
        `;

        table.innerHTML = html;
    }

    renderTimeline() {
        const job = this.selectedJob;
        const section = document.getElementById('timeline-section');

        if (!job.hoursPerUnit) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        const totalHours = job.hoursPerUnit * this.squareFootage;
        const workDays = Math.ceil(totalHours / 8);
        const weeks = Math.ceil(workDays / 5);

        document.getElementById('timeline-hours').textContent = formatNumber(Math.round(totalHours));
        document.getElementById('timeline-days').textContent = formatNumber(workDays);
        document.getElementById('timeline-weeks').textContent = weeks < 1 ? '< 1' : formatNumber(weeks);
    }

    filterJobs(searchTerm) {
        const term = searchTerm.toLowerCase();

        document.querySelectorAll('.category').forEach(category => {
            let hasVisible = false;

            category.querySelectorAll('.job-item').forEach(job => {
                const name = job.querySelector('.job-item-name').textContent.toLowerCase();
                const matches = name.includes(term);
                job.style.display = matches ? 'flex' : 'none';
                if (matches) hasVisible = true;
            });

            // Show category if any jobs match
            if (term) {
                category.classList.toggle('expanded', hasVisible);
                category.style.display = hasVisible ? 'block' : 'none';
            } else {
                category.style.display = 'block';
                category.classList.remove('expanded');
            }
        });
    }

    getIcon(iconName) {
        const icons = {
            home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
            layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
            square: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>',
            grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
            zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
            droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
            brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>',
            fence: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3v18M12 3v18M20 3v18M4 12h8M12 12h8"/></svg>',
            hammer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>',
            thermometer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>',
            layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
            box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
            window: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/></svg>',
            tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7M9 22h6M12 3l8 10H4l8-10z"/></svg>',
            sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
        };
        return icons[iconName] || icons.square;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EstimatorApp();
});
