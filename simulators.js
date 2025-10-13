// 시뮬레이션 로직
function simulateFIFO(pages, frameCount) {
    const frames = [];
    let pageFaults = 0;
    
    for (let page of pages) {
        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
            }
        }
    }
    
    return pageFaults;
}

function simulateLRU(pages, frameCount) {
    const frames = [];
    let pageFaults = 0;
    
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let lruIndex = 0;
                let minLastUsed = i;
                
                for (let j = 0; j < frames.length; j++) {
                    let lastUsed = -1;
                    for (let k = i - 1; k >= 0; k--) {
                        if (pages[k] === frames[j]) {
                            lastUsed = k;
                            break;
                        }
                    }
                    
                    if (lastUsed < minLastUsed) {
                        minLastUsed = lastUsed;
                        lruIndex = j;
                    }
                }
                
                frames[lruIndex] = page;
            }
        }
    }
    
    return pageFaults;
}

function simulateLFU(pages, frameCount) {
    const frames = [];
    const frequency = {};
    let pageFaults = 0;
    
    for (let page of pages) {
        frequency[page] = (frequency[page] || 0) + 1;
        
        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let lfuIndex = 0;
                let minFreq = frequency[frames[0]];
                
                for (let j = 1; j < frames.length; j++) {
                    if (frequency[frames[j]] < minFreq) {
                        minFreq = frequency[frames[j]];
                        lfuIndex = j;
                    }
                }
                
                frames[lfuIndex] = page;
            }
        }
    }
    
    return pageFaults;
}

function simulateFIFODetailed(pages, frameCount) {
    const frames = [];
    let pageFaults = 0;
    const history = [];
    
    for (let page of pages) {
        let fault = false;
        let out = null;
        
        if (!frames.includes(page)) {
            pageFaults++;
            fault = true;
            
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                out = frames.shift();
                frames.push(page);
            }
        }
        
        history.push({
            frames: [...frames],
            fault: fault,
            out: out
        });
    }
    
    return { faults: pageFaults, finalFrames: frames, history: history };
}

function simulateLRUDetailed(pages, frameCount) {
    const frames = [];
    let pageFaults = 0;
    const history = [];
    
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        let fault = false;
        let out = null;
        
        if (!frames.includes(page)) {
            pageFaults++;
            fault = true;
            
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let lruIndex = 0;
                let minLastUsed = i;
                
                for (let j = 0; j < frames.length; j++) {
                    let lastUsed = -1;
                    for (let k = i - 1; k >= 0; k--) {
                        if (pages[k] === frames[j]) {
                            lastUsed = k;
                            break;
                        }
                    }
                    
                    if (lastUsed < minLastUsed) {
                        minLastUsed = lastUsed;
                        lruIndex = j;
                    }
                }
                
                out = frames[lruIndex];
                frames[lruIndex] = page;
            }
        }
        
        history.push({
            frames: [...frames],
            fault: fault,
            out: out
        });
    }
    
    return { faults: pageFaults, finalFrames: frames, history: history };
}

function simulateLFUDetailed(pages, frameCount) {
    const frames = [];
    const frequency = {};
    let pageFaults = 0;
    const history = [];
    
    for (let page of pages) {
        frequency[page] = (frequency[page] || 0) + 1;
        
        let fault = false;
        let out = null;
        
        if (!frames.includes(page)) {
            pageFaults++;
            fault = true;
            
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let lfuIndex = 0;
                let minFreq = frequency[frames[0]];
                
                for (let j = 1; j < frames.length; j++) {
                    if (frequency[frames[j]] < minFreq) {
                        minFreq = frequency[frames[j]];
                        lfuIndex = j;
                    }
                }
                
                out = frames[lfuIndex];
                frames[lfuIndex] = page;
            }
        }
        
        history.push({
            frames: [...frames],
            fault: fault,
            out: out
        });
    }
    
    return { faults: pageFaults, finalFrames: frames, history: history };
}

function simulateFCFS(processes) {
    let currentTime = 0;
    let totalWaitTime = 0;
    
    processes.forEach(p => {
        if (currentTime < p.arrival) {
            currentTime = p.arrival;
        }
        
        const waitTime = currentTime - p.arrival;
        totalWaitTime += waitTime;
        
        currentTime += p.burst;
    });
    
    return totalWaitTime / processes.length;
}

function simulateSJF(processes) {
    const remaining = [...processes];
    const completed = [];
    let currentTime = 0;
    let totalWaitTime = 0;
    
    while (remaining.length > 0) {
        const available = remaining.filter(p => p.arrival <= currentTime);
        
        if (available.length === 0) {
            currentTime = remaining[0].arrival;
            continue;
        }
        
        available.sort((a, b) => a.burst - b.burst);
        const selected = available[0];
        
        const waitTime = currentTime - selected.arrival;
        totalWaitTime += waitTime;
        
        currentTime += selected.burst;
        
        const index = remaining.indexOf(selected);
        remaining.splice(index, 1);
        completed.push(selected);
    }
    
    return totalWaitTime / processes.length;
}

function simulateRR(processes, quantum) {
    const queue = [];
    const remainingBurst = {};
    const waitTime = {};
    const arrivalTime = {};
    
    processes.forEach(p => {
        remainingBurst[p.name] = p.burst;
        waitTime[p.name] = 0;
        arrivalTime[p.name] = p.arrival;
    });
    
    let currentTime = 0;
    let index = 0;
    
    queue.push(processes[0]);
    index++;
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (currentTime < arrivalTime[current.name]) {
            currentTime = arrivalTime[current.name];
        }
        
        const executeTime = Math.min(quantum, remainingBurst[current.name]);
        
        currentTime += executeTime;
        remainingBurst[current.name] -= executeTime;
        
        while (index < processes.length && processes[index].arrival <= currentTime) {
            queue.push(processes[index]);
            index++;
        }
        
        if (remainingBurst[current.name] > 0) {
            queue.push(current);
        } else {
            waitTime[current.name] = currentTime - arrivalTime[current.name] - processes.find(p => p.name === current.name).burst;
        }
    }
    
    let totalWaitTime = 0;
    processes.forEach(p => {
        totalWaitTime += waitTime[p.name];
    });
    
    return totalWaitTime / processes.length;
}